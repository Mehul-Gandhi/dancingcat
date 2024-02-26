import OpenAI from "openai";

const openai = new OpenAI();

const prompt = "You are a helpful assistant. You answer all questions briefly, and only provide factual information, without followup questions.";

let chatHistory = [{ role: "system", content: prompt }];

async function getVespaResults(query) {
  const fetch = require('node-fetch');
  let baseurl = "http://localhost:8080/search/?yql="
  let yql = encodeURIComponent("select * from sources * where userQuery() or ({targetHits: 10}nearestNeighbor(auto_embedding, embedding)) limit 5") +
    "&input.query(embedding)=" + encodeURIComponent("embed(e5, \"query:"+query+"\")") +
    "&query="+encodeURIComponent(query) +
    "&ranking=combined";
  console.log(baseurl + yql);
  let vespaResponse = await (await fetch(baseurl + yql)).json();

  let children = vespaResponse.root.children || [];
  let results = [];

  var anyRelevant = false;
  if(children.length > 0) {
    var context = "Here is some factual information you have found by searching, which you can use to answer the question:";
    for (const result of children) {
      console.log("Retrieved result:", result.id, "with relevance score", result.relevance);
      if(result.relevance > 0.66) {
        anyRelevant = true;
        context = context + "\n" + result.fields.text;
      }
    }
    context = context + "\n" + "Now write a helpful and factual response to this:"
    results.push({role:"system", content:context})
  }
  if(anyRelevant) {
    return results;
  } else {
    return [];
  }
}

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      if (req.query.endpoint === "chat") {
        // Handle POST to /api/generate?endpoint=chat
        const content = req.body.message;
        chatHistory.push({ role: "user", content: content });
        res.status(200).json({ success: true });
      } else if (req.query.endpoint === "reset") {
        // Handle POST to /api/generate?endpoint=reset
        chatHistory = [
          { role: "system", content: prompt },
        ];
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ error: "Not Found" });
      }
      break;
    case "GET":
      if (req.query.endpoint === "history") {
        res.status(200).json(chatHistory);
      } else if (req.query.endpoint === "stream") {
        // Set headers for Server-Sent Events
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        try {
          let userMessage = chatHistory[chatHistory.length-1];

          let vespaResults = await getVespaResults(userMessage.content);

          for (const vespaResult of vespaResults) {
            chatHistory.splice(chatHistory.length-1, 0, vespaResult);
          }

          console.log(chatHistory);

          const stream = await openai.beta.chat.completions.stream({
            model: "llama2",
            messages: chatHistory,
            stream: true,
          });

          for await (const chunk of stream) {
            const message = chunk.choices[0]?.delta?.content || "";
            res.write(`data: ${JSON.stringify(message)}\n\n`);
          }

          // After the stream ends, get the final chat completion
          const chatCompletion = await stream.finalChatCompletion();
        } catch (error) {
          res.write(
            "event: error\ndata: " +
              JSON.stringify({ message: "Stream encountered an error" }) +
              "\n\n"
          );
        }

        // When the client closes the connection, we stop the stream
        return new Promise((resolve) => {
          req.on("close", () => {
            resolve();
          });
        });
      } else {
        res.status(404).json({ error: "Not Found" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
