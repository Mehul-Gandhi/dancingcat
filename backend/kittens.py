import pyairtable as lib
from flask import Flask
import os
from datetime import datetime
from collections import defaultdict
from flask_cors import CORS

app = Flask(__name__)
from dotenv import load_dotenv
load_dotenv()
CORS(app, resources={r"/*": {"origins": "*"}})

api_key = os.environ.get('API_KEY')
table_key = os.environ.get('TABLE_KEY')
testApi = lib.Api(api_key)
table = testApi.table(table_key, "Kittens")
all_current_kittens = table.all(view="All Current Kittens")
vaccination_tracker = table.all(view="Vaccination Tracker")
combo_test = table.all(view="Kittens needing combo test")
spay_neuter = table.all(view="Spay/Neuter Tracker")
 


@app.route('/kitten-tracking-status', methods=['GET'])
def get_status_json(kitten_table=all_current_kittens):
    """
    """
    unique_statuses = set([x['fields']['Status'] for\
                        x in kitten_table if "Status" in x['fields']])
    status = {k: 0 for k in unique_statuses}

    for kitten in kitten_table:
        status[kitten['fields']['Status']] += 1
    count = len(all_current_kittens)
    for k, v in status.items():
        status[k] = {
            "Values": v,
            "Percent": round((v / count) * 100, 2)
        }
    return status

@app.route('/kitten-tracking-numbers', methods=['GET'])
def get_kitten_numbers():
    count = len(all_current_kittens) #26 kittens
    num_vaccinations = len(vaccination_tracker) #9 vaccinations
    spay_neuter_count = len(spay_neuter) # 7 kittens 
    combo_test_count = len(combo_test)
    return {
        "Total Cats": count,
        "Vaccinations": num_vaccinations,
        "Spay/Neuter": spay_neuter_count,
        "Combo Test": combo_test_count
    }

@app.route('/kitten-tracking-ages', methods=['GET'])
def age_in_weeks(kitten_table=all_current_kittens):
    """
    Bar chart visualization.
    """
    age = defaultdict(int)
    date_format = "%m/%d/%Y"
    current_date_str = datetime.now().strftime(date_format)
    current_date = datetime.strptime(current_date_str, date_format)
    print(current_date)
    for kitten in kitten_table:
        birth_date_str = kitten['fields']['DOB']
        print(birth_date_str)
        year, month, day = birth_date_str.split('-')
        birth_date = datetime.strptime(f"{month}/{day}/{year}", date_format)
        print(birth_date)
        difference = current_date - birth_date 
        age_in_weeks = difference.days // 7
        age[age_in_weeks] += 1
    return age

@app.route('/kitten-tracking-get', methods=['GET'])
def get_current_kittens():
    return all_current_kittens

@app.route('/kitten-tracking-vaccination_dates', methods=['GET'])
def get_kitten_vax_dates(kitten_table):
    status  = {}
    for kitten in kitten_table:
        internal = {}
        for i in range(5):
            vaccine = "FVRCP " + str(i + 1)
            try:
                if (kitten["fields"][vaccine]):
                    internal[vaccine] = kitten["fields"][vaccine]
            except KeyError:
                continue
        for i in range(1):
            try:
                internal["Rabies Vaccine Administration"] = kitten["fields"]["Rabies Vaccine"]
            except KeyError:
                continue
        internal["Current Foster"] = kitten["fields"]["First name"]
        internal["DoB"] = kitten["fields"]["DOB"]
        internal["Countdown Date"] = kitten["fields"]["countdown date"]
        internal["Days to Countdown Date"] = kitten["fields"]["Countdown"]
        status[kitten["fields"]["Kitten Name"]] = internal
    return status

if __name__ == '__main__':
    app.run(debug=True)
