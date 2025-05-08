from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

def pass_calculator(marks):
    if marks > 50:
        return {"message": "Chillout you have already passed! Enjoy :)", "passed": True}
    else:
        diff = 50 - marks
        pass_marks = 1.75 * diff
        return {"pass_marks": round(pass_marks, 2), "passed": False}

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    marks = float(data.get('marks', 0))
    result = pass_calculator(marks)
    return jsonify(result)

# This is only used when running the app locally
if __name__ == '__main__':
    app.run()