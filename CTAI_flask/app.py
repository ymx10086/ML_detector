import datetime
import logging as rel_log
import os
import shutil
from datetime import timedelta

from flask import *

# 导入上一级目录的model中的train.py
import sys
sys.path.append("./model/")
from train import *

UPLOAD_FOLDER = r'./uploads'

ALLOWED_EXTENSIONS = set(['csv'])
app = Flask(__name__)
app.secret_key = 'secret!'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

werkzeug_logger = rel_log.getLogger('werkzeug')
werkzeug_logger.setLevel(rel_log.DEBUG)

# 解决缓存刷新问题
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)


# 添加header解决跨域
@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Requested-With'
    return response


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def allowed_src(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/')
def hello_world():
    return redirect(url_for('static', filename='./index.html'))

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    print(request.files)
    file = request.files['file']
    # 将file的文件名修改为process.csv
    file.filename = 'train.csv'
    print(datetime.datetime.now(), file.filename)
    if file and allowed_file(file.filename):
        src_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(src_path)
        shutil.copy(src_path, './tmp/train_data')
        csv_path = os.path.join('./tmp/train_data', file.filename)
        print(src_path, csv_path)

        return jsonify({'status': 1,
                        })

    return jsonify({'status': 0})

@app.route('/upload2', methods=['GET', 'POST'])
def upload_file2():
    print(request.files)
    file = request.files['file']
    # 将file的文件名修改为process.csv
    file.filename = 'test.csv'
    print(datetime.datetime.now(), file.filename)
    if file and allowed_file(file.filename):
        src_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(src_path)
        shutil.copy(src_path, './tmp/train_data')
        csv_path = os.path.join('./tmp/train_data', file.filename)
        print(src_path, csv_path)

        # x_train, x_test, y_train, y_test = process_test()
        # count = predict(x_test)
        # show(count)

        #第一个参数训练集 第二个参数测试集
        #生成预测结果submit.json
        #保存模型model.pkl
        #生成标签分类label.txt
        test_model('./tmp/train_data/train.csv','./tmp/train_data/test.csv')

        pid = "类别分析.png"
        csv_info = "类别分析.csv"

        return jsonify({'status': 1,
                        })

    return jsonify({'status': 0})


@app.route("/download", methods=['GET'])
def download_file():
    # 读取label.txt文件中的内容（在tmp/result/label.txt中），文件内容如下：
    #Label 4: 336
    #Label 0: 621
    #Label 5: 339
    #Label 1: 171
    #Label 2: 196
    #Label 3: 337
    # 生成一个字典，key为类别，value为数量，返回给前端json
    # 例如：{"4": 336, "0": 621, "5": 339, "1": 171, "2": 196, "3": 337}
    with open('tmp/result/label.txt', 'r') as f:
        label = f.readlines()
    label_dict = {}
    for i in label:
        label_dict[i.split(':')[0].split(' ')[1]] = int(i.split(':')[1].split('\n')[0])
    print(label_dict)
    return jsonify(label_dict)




@app.route("/test1", methods=['GET'])
def download_file1():
    # 需要知道2个参数, 第1个参数是本地目录的path, 第2个参数是文件名(带扩展名)
    return send_from_directory('tmp/result', 'submit.json', as_attachment=True)


# show photo
@app.route('/tmp/<path:file>', methods=['GET'])
def show_photo(file):
    if request.method == 'GET':
        if not file is None:
            image_data = open(f'tmp/{file}', "rb").read()
            response = make_response(image_data)
            response.headers['Content-Type'] = 'image/png'
            return response

if __name__ == '__main__':
    files = [
        'uploads', 'tmp/train_data', 'tmp/draw',
        'tmp/image', 'tmp/mask', 'tmp/uploads'
    ]
    for ff in files:
        if not os.path.exists(ff):
            os.makedirs(ff)
    # with app.app_context():
    #     current_app.model = deploy.Predictor(
    #         './core/net/inference_model', use_gpu=True)
    app.run(host='127.0.0.1', port=3000, debug=True)
