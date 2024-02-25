import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome.js';
import { useState } from 'react'; // import the hook

function App() {
  // function doCoolStuff() {
  //   alert('yay cool')
  // }
  const [count, setCount] = useState(0) // create state
  const[tasks, setTasks] = useState(["hello"]); // initial value is an array
  const[inputValue, setInputValue] = useState("Task...");

  const addTask = () => {
    setCount(count + 1);

    setTasks([...tasks, inputValue]);
    setInputValue("");
  };
  // return (
  //   <div>
  //     <p>You Clicked {count} times</p>
  //     <button onClick={() => setCount(count+1)}>Click Me</button>
  //   </div>
  // )
  const increment = () => {
    setCount(count + 1);
  }
  // const tasks = ["Give Workshop", "Field Questions"];
  return (
    <div className="App">
      <header className="App-header">
        <h1>Current count: {count}</h1>
        
        <input placeholder="Add a task..."
         value={inputValue} 
         onChange={(event) => setInputValue(event.target.value)}
         />
        <button onClick = {addTask}>Add Task</button>
        <ul>
          {tasks.map((task) => {
            return (
              <li>{task}</li>
            )
          })

          }
        </ul>
      </header>
    </div>
  );
  

  // const doCoolStuff = () => {
  //   alert('yay wow')
  // }

  // <ul>
  //   <li>Task 1 - Give Workshops</li>
  // </ul>
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <h1> yoyoo</h1>
  //       <h1>Current count: {count}</h1>
  //       <button onClick={increment}Click Me></button>
  //       <Welcome name = "Jessica"/>
  //       <Welcome name="Madhave"/>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
