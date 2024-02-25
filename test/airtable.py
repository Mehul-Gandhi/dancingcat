import pyairtable as lib
from flask import Flask

app = Flask(__name__)


testApi = lib.Api("pat3D5wMrLCN42wp1.108b4681e97af87c24555148480410f53290123a38b9099cda9308f65fa36b12")
table   = testApi.table("appf8K2wKv3O6cvgF","Kittens")
all_current_kittens = table.all(view="All Current Kittens")
vaccination_tracker = table.all(view="Vaccination Tracker")
combo_test = table.all(view="Kittens needing combo test")
spay_neuter = table.all(view="Spay/Neuter Tracker")
num_vaccinations = len(vaccination_tracker) #9 vaccinations
 
count = len(all_current_kittens) #26 kittens    
spay_neuter_count = len(spay_neuter) # 7 kittens


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
    