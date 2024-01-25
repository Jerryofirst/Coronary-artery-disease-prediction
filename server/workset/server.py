import json

import numpy as np
from flask import Flask, request, jsonify
import buildup

app = Flask(__name__)

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        return super(NumpyEncoder, self).default(obj)

app.json_encoder = NumpyEncoder


@app.route('/predict_cad', methods=['POST'])
def predict_cad_diagnosis():
    typical_chest_pain = int(request.form['typical_chest_pain'])
    region_rwma = int(request.form['region_rwma'])
    atypical = int(request.form['atypical'])
    nonanginal = int(request.form['nonanginal'])
    tinversion = int(request.form['tinversion'])
    tg = int(request.form['tg'])
    bp = int(request.form['bp'])
    htn = int(request.form['htn'])
    age = int(request.form['age'])
    dm = int(request.form['dm'])

    response = jsonify({'diagnosis': buildup.predict_diagnosis(typical_chest_pain,atypical,nonanginal,tinversion,region_rwma,tg,bp,htn,age,dm)})

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For CAD diagnosis...")
    buildup.load_saved_workset()
    app.run()