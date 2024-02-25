import pyairtable as lib
from flask import Flask
import os


app = Flask(__name__)

api_key = os.environ.get('API_KEY')
table_key = os.environ.get('TABLE_KEY')
testApi = lib.Api(api_key)
table   = testApi.table(table_key, "Kittens")
all_current_kittens = table.all(view="All Current Kittens")
vaccination_tracker = table.all(view="Vaccination Tracker")
combo_test = table.all(view="Kittens needing combo test")
spay_neuter = table.all(view="Spay/Neuter Tracker")
 


@app.route('/kitten-tracking-status', methods=['GET'])
def get_status_json(kitten_table):
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
def get_kitten_numbers(kitten_table):
    count = len(all_current_kittens) #26 kittens
    num_vaccinations = len(vaccination_tracker) #9 vaccinations
    spay_neuter_count = len(spay_neuter) # 7 kittens 
    combo_test_count = len(combo_test)
    return {
        "Count": count,
        "Vaccinations": num_vaccinations,
        "Spay/Neuter": spay_neuter_count,
        "Combo Test": combo_test_count
    }