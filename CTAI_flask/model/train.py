# coding=gbk
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from xgboost import XGBClassifier
import os


def process():
    df = pd.read_csv('./tmp/train_data/preprocess_train.csv', index_col=None)
    # 数据标准化
    features = df.iloc[:, 1:-1]
    numeric_features = features.dtypes[features.dtypes != 'object'].index
    features[numeric_features] = features[numeric_features].apply(
        lambda x: (x - x.mean()) / (x.std())
    )
    # 在标准化数据之后，所有均值消失，因此我们可以将缺失值设置为0
    features[numeric_features] = features[numeric_features].fillna(0)
    features_labels = pd.concat([features, df[['label']]], axis=1)
    train_features = pd.concat([df[['sample_id']], features], axis=1)
    train_label = df[['sample_id', 'label']]
    df = pd.concat([train_features, train_label[['label']]], axis=1)

    df.to_csv("data.csv")

    target_name = 'label'
    x = df.drop(['sample_id', 'label'], axis=1)
    y = df[['label']]
    x = np.array(x)
    y = np.array(y).reshape((-1,))

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.05, random_state=123, stratify=y)

    return x_train, x_test, y_train, y_test

def process_test():
    df = pd.read_csv('./tmp/train_data/test_data.csv', index_col=None)
    # 数据标准化
    features = df.iloc[:, 1:-1]
    numeric_features = features.dtypes[features.dtypes != 'object'].index
    features[numeric_features] = features[numeric_features].apply(
        lambda x: (x - x.mean()) / (x.std())
    )
    # 在标准化数据之后，所有均值消失，因此我们可以将缺失值设置为0
    features[numeric_features] = features[numeric_features].fillna(0)
    features_labels = pd.concat([features, df[['label']]], axis=1)
    train_features = pd.concat([df[['sample_id']], features], axis=1)
    train_label = df[['sample_id', 'label']]
    df = pd.concat([train_features, train_label[['label']]], axis=1)

    df.to_csv("test_data.csv")

    target_name = 'label'
    x = df.drop(['sample_id', 'label'], axis=1)
    # y = df[['label']]
    x = np.array(x)
    # y = np.array(y).reshape((-1,))
    y = []

    # x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=1, random_state=123, stratify=y)

    return x, y, x, y

def train(x_train, y_train):
    model = XGBClassifier(learning_rate=0.14)
    # 保存模型参数
    model_path = './data/'
    if not os.path.exists(model_path):
        os.makedirs(model_path)
    
    model.fit(x_train,
              y_train)
    model.save_model(model_path + 'model_param.pth')
    return model

def test(x_test, y_test):
    # 加载模型
    model_path = './data/'
    model = XGBClassifier()
    model.load_model(model_path + 'model_param.pth')

    pred = model.predict(x_test)
    # result_path = 'result/LGBM.txt'

    count = [0, 0, 0, 0, 0, 0]
    TP = [0, 0, 0, 0, 0, 0]
    FP = [0, 0, 0, 0, 0, 0]
    FN = [0, 0, 0, 0, 0, 0]
    for i in range(len(y_test)):
        if pred[i] == 0:
            count[0] += 1
        if pred[i] == 0 and y_test[i] == 0:
            TP[0] += 1
        if pred[i] != 0 and y_test[i] == 0:
            FN[0] += 1
        if pred[i] == 0 and y_test[i] != 0:
            FP[0] += 1

        if pred[i] == 1:
            count[1] += 1
        if pred[i] == 1 and y_test[i] == 1:
            TP[1] += 1
        if pred[i] != 1 and y_test[i] == 1:
            FN[1] += 1
        if pred[i] == 1 and y_test[i] != 1:
            FP[1] += 1

        if pred[i] == 2:
            count[2] += 1
        if pred[i] == 2 and y_test[i] == 2:
            TP[2] += 1
        if pred[i] != 2 and y_test[i] == 2:
            FN[2] += 1
        if pred[i] == 2 and y_test[i] != 2:
            FP[2] += 1

        if pred[i] == 3:
            count[3] += 1
        if pred[i] == 3 and y_test[i] == 3:
            TP[3] += 1
        if pred[i] != 3 and y_test[i] == 3:
            FN[3] += 1
        if pred[i] == 3 and y_test[i] != 3:
            FP[3] += 1

        if pred[i] == 4:
            count[4] += 1
        if pred[i] == 4 and y_test[i] == 4:
            TP[4] += 1
        if pred[i] != 4 and y_test[i] == 4:
            FN[4] += 1
        if pred[i] == 4 and y_test[i] != 4:
            FP[4] += 1

        if pred[i] == 5:
            count[5] += 1
        if pred[i] == 5 and y_test[i] == 5:
            TP[5] += 1
        if pred[i] != 5 and y_test[i] == 5:
            FN[5] += 1
        if pred[i] == 5 and y_test[i] != 5:
            FP[5] += 1

    Precision = [0, 0, 0, 0, 0, 0]
    Recall = [0, 0, 0, 0, 0, 0]

    Precision[0] = TP[0] / (TP[0] + FP[0])
    Precision[1] = TP[1] / (TP[1] + FP[1])
    Precision[2] = TP[2] / (TP[2] + FP[2])
    Precision[3] = TP[3] / (TP[3] + FP[3])
    Precision[4] = TP[4] / (TP[4] + FP[4])
    Precision[5] = TP[5] / (TP[5] + FP[5])

    for i in range(6):
        print('Precision: {}\n'.format(Precision[i]))

    Recall[0] = TP[0] / (TP[0] + FN[0])
    Recall[1] = TP[1] / (TP[1] + FN[1])
    Recall[2] = TP[2] / (TP[2] + FN[2])
    Recall[3] = TP[3] / (TP[3] + FN[3])
    Recall[4] = TP[4] / (TP[4] + FN[4])
    Recall[5] = TP[5] / (TP[5] + FN[5])

    for i in range(6):
        print('Recall: {}\n'.format(Recall[i]))

    Macro_Precision = sum([Precision[0], Precision[1], Precision[2],
                           Precision[3], Precision[4], Precision[5]]) / 6
    Macro_Recall = sum([Recall[0], Recall[1], Recall[2],
                        Recall[3], Recall[4], Recall[5]]) / 6
    Macro_F1 = 2 * Macro_Precision * Macro_Recall / (Macro_Precision + Macro_Recall)
    print('Macro_F1: {}\n'.format(Macro_F1))

    # f = open(result_path, 'w', encoding='utf-8')
    # for i in range(6):
    #     f.write('类别{}: '.format(i))
    #     f.write('\n')
    #     f.write('Precision: {:.2f}%'.format(Precision[i] * 100))
    #     f.write('\n')
    #     f.write('Recall: {:.2f}%'.format(Recall[i] * 100))
    #     f.write('\n')

    # f.write('Macro_F1: {:.2f}'.format(Macro_F1))
    # f.write('\n')

    # f.close()
    return count

def predict(x_test):
    # 加载模型
    model_path = './data/'
    model = XGBClassifier()
    model.load_model(model_path + 'model_param.pth')

    #通过模型进行预测
    pred = model.predict(x_test)

    count = [0, 0, 0, 0, 0, 0]
    for i in range(len(pred)):
        if pred[i] == 0:
            count[0] += 1

        if pred[i] == 1:
            count[1] += 1

        if pred[i] == 2:
            count[2] += 1

        if pred[i] == 3:
            count[3] += 1

        if pred[i] == 4:
            count[4] += 1

        if pred[i] == 5:
            count[5] += 1

    # 将预测结果pred保存到本地的csv文件中
    # 保存路径为./data/result.csv
    # 保存格式为csv
    # 保存内容为pred
    # 保存时不保存行索引和列索引
    pd.DataFrame(pred).to_csv('./data/result.csv', header=False, index=False)    

    return count


def show(count):
    plt.rcParams["font.sans-serif"] = ['SimHei']
    plt.rcParams["axes.unicode_minus"] = False

    for i in range(6):
        plt.bar(i, count[i])

    plt.title("类别分析")
    plt.xlabel("类别")
    plt.ylabel("数量")

    # 打印当前路径
    print(os.getcwd())
    # 如果../tmp/test_src文件夹不存在，则创建该文件夹

    if not os.path.exists('./tmp/test_src'):
        os.mkdir('./tmp/test_src')

    # 保存图片到本地
    plt.savefig('./tmp/test_src/analysis.png')
    # plt.show()


if __name__ == '__main__':
    x_train, x_test, y_train, y_test = process()
    model = train(x_train, y_train)
    count = test(model, x_test, y_test)
    show(count)

