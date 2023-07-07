import numpy as np
import pandas as pd
from xgboost import XGBClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel
from sklearn.impute import KNNImputer
from scipy.stats import mode
import json
import pickle
from collections import Counter

def preprocess_data(df):
    if 'sample_id' in df.columns:
        df = df.drop(['sample_id'], axis=1)
    keep_features = ['feature'+str(i) for i in [5,6,16,19,22,29,45,55,66,67,90,91,27,71,35,15,2,44,99,33,97,31,11,76,49,37,8,42,10]]                                            
    df = df[keep_features]
    df = df.fillna(0)
    return df


def test_model(train_file,test_file):
    df_train = pd.read_csv(train_file, index_col=None)
    df_train.info()
    x_train = preprocess_data(df_train)
    y_train = df_train['label']
    model = RandomForestClassifier()
    model.fit(x_train, y_train)
    #����ѵ��ģ��
    with open('tmp/result/model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    df_validate = pd.read_csv(test_file, index_col=None)
    df_validate.info()
    x_test = preprocess_data(df_validate)

    # ʹ���ѱ����ģ�ͽ���Ԥ��
    with open('tmp/result/model.pkl', 'rb') as f:
        model_pre = pickle.load(f)
    pred_pre = model_pre.predict(x_test)

    # ����һ���ֵ䣬����keyΪ����������sample_id��valueΪԤ������
    pred_dict_pre = {str(id): int(prediction) for id, prediction in zip(df_validate['sample_id'], pred_pre)}

    # ���ֵ�д�뵽json�ļ���
    with open('tmp/result/pred_pre.json', 'w') as f:
        json.dump(pred_dict_pre, f)

    # ͳ��ÿ����������
    label_counts_pre = Counter(pred_pre)

    # ����ÿ������������label_pre.txt�ļ�
    with open('tmp/result/label_pre.txt', 'w') as f:
        for label, count in label_counts_pre.items():
            f.write(f'Label {label}: {count}\n')

    predictions = []

    # ͶƱ
    for i in range(20):
        model = RandomForestClassifier()
        model.fit(x_train, y_train)
        pred = model.predict(x_test)
        predictions.append(pred)

    pred = np.array(predictions)
    final_pred = mode(pred, axis=0)[0] 
    final_pred = final_pred.ravel()

    pred_dict = {str(id): int(prediction) for id, prediction in zip(df_validate['sample_id'], final_pred)}

    with open('tmp/result/submit.json', 'w') as f:
        json.dump(pred_dict, f)

    # ͳ��ÿ����������
    label_counts = Counter(final_pred)

    # ����ÿ������������label.txt�ļ�
    with open('tmp/result/label.txt', 'w') as f:
        for label, count in label_counts.items():
            f.write(f'Label {label}: {count}\n')
