from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
app = Flask(__name__)
CORS(app)
@app.route('/runCode/', methods=['GET', 'POST'])
def welcome():
    if request.method == 'POST':
        request_json = request.get_json()
        print(request_json)
        if request_json['language'] == "Python":
            with open('temp.py','w') as f:
                f.write(request_json['code'])

            p1 = subprocess.run(['python', 'temp.py'], capture_output=True)
            if p1.returncode == 0:
                print("success")
                output = p1.stdout.decode()
                data = {"output":output}
            else:
                print("failed")
                error = p1.stderr.decode()
                data = {"output":error}
        else:
            data = {"output": f"Currently our code editor only supports Python we will add support to {request_json['language']} very soon! Sorry for inconvenience.😔"}

    else:     
        data = {"output":"Please write code"}
    return jsonify(data)
if __name__ == '__main__':
    app.run(port=2022, debug=False)