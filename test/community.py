import pyairtable as lib
from flask import Flask
import os
import collections
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

api_key = os.environ.get('API_KEY')
table_key = os.environ.get('TABLE_KEY')
testApi = lib.Api(api_key)
table   = testApi.table("appTkpgY4PivTGJqO", "Community Support Requests")
all_cases = table.all(view="All cases")

@app.route('/community-support-numbers', methods=['GET'])
def get_community_numbers():
    all_cases_len = len(all_cases)
    open_medical_cases = table.all(view="Open Medical cases")
    closed_medical_cases = table.all(view="Closed Medical Cases")
    graham_grants = table.all(view="Cases eligible for grants")
    pahs_paid_adult = sum([x['fields']["Number of adult cats"] for x\
                    in all_cases if "Financial Support needed?" in x['fields'] \
                        and "Number of adult cats" in x['fields'] \
                            and  x['fields']["Financial Support needed?"]])
    
    pahs_paid_kittens = sum([x['fields']["Number of kittens"] for x\
                    in all_cases if "Financial Support needed?" in x['fields']\
                        and "Number of kittens" in x['fields'] and x['fields']["Financial Support needed?"]])
    num_kittens = sum([x['fields']["Number of kittens"] for x in all_cases if "Number of kittens" in x['fields']])
    num_adult_cats = sum([x['fields']["Number of adult cats"] for x in all_cases if "Number of adult cats" in x['fields']])

    request_types = collections.defaultdict(int)
    for case in all_cases:
        case = case['fields']
        if "Type of Request" in case:
            request_types[case["Type of Request"]] += 1
    for k, v in request_types.items():
        request_types[k] = {
            "Values": v,
            "Percent": round((v / len(all_cases)) * 100, 2)
        }
    
    return {
        "Total Cases": all_cases_len,
        "Open Medical Cases": len(open_medical_cases),
        "Closed Medical Cases": len(closed_medical_cases),
        "Cases Eligible for Graham Grant": len(graham_grants),
        "Spay/neuters paid by PAHS - adult cats": pahs_paid_adult,
        "Spay/neuters paid by PAHS - kittens": pahs_paid_kittens,
        "Number of cats assisted": num_kittens + num_adult_cats,
        "Number of kittens assisted": num_kittens,
        "Requests": request_types
    }
