import pickle
import json
import numpy as np

__data_columns = None
__model = None


def predict_diagnosis(typical_chest_pain,atypical,nonanginal,tinversion,region_rwma,tg,bp,htn,age,dm):
    x = np.zeros(len(__data_columns))
    x[0] = int(typical_chest_pain)
    x[1] = int(atypical)
    x[2] = int(nonanginal)
    x[3] = int(tinversion)
    x[4] = int(region_rwma)
    x[5] = int(tg)
    x[6] = int(bp)
    x[7] = int(htn)
    x[8] = int(age)
    x[9] = int(dm)

    return __model.predict([x])[0]


def load_saved_workset():
    print("loading saved sources...starting")
    global __data_columns
    global __model

    with open("CAD_columns.json",'r') as f:
        __data_columns = json.load(f)["data_columns"]

    with open("CAD_data.pickle",'rb') as f:
        __model = pickle.load(f)
        print("loading saved sources...done")


if __name__ == '__main__':
    load_saved_workset()
    print(predict_diagnosis(1,0,0,1,2,350,120,1,60,0))
    print(predict_diagnosis(0,1,0,0,0,60,95,0,45,0))