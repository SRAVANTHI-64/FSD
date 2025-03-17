
from flask import Flask, json, jsonify,make_response, request
from google.oauth2 import id_token
from google.auth.transport import requests

from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

from database import getdiaryhistory, getmatchedvectors, insert_diary_page

app = Flask(__name__)

CORS(app)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow your Angular app
    response.headers.add('Access-Control-Allow-Credentials', 'true')  # Allow credentials
    response.headers.add('Access-Control-Allow-Headers', 'Authorization, Content-Type')  # Allow specific headers
    return response

@app.before_request
def before_request():
    if request.endpoint != 'verify_token' and request.endpoint != 'test':
        if request.method != "OPTIONS":
            if verify_token()[1] != 200:
                return jsonify({
                    "response":"token validation failed"
                }),401
            else:
                print("token is valid")
                pass

    
@app.route('/verify_token',methods=['GET'])
def verify_token():
    try:
        # Get token from the Authorization header
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Authorization header is missing or invalid"}), 401

        # Extract the token from the Authorization header (Bearer <token>)
        token = auth_header.split(" ")[1]


        print(token)
        CLIENT_ID="1007863288401-qiqf1kf5c8051i3dc0trtg26k9e4cn2l.apps.googleusercontent.com"
        # try:
            # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID,clock_skew_in_seconds=10)

        print(idinfo)
        user_id = idinfo["sub"]
        expiry_time = idinfo["exp"]
        cookie_json = {
            "userID":user_id,
            "aT":token
        }

        return(jsonify({"message": {"id":user_id,"exp":expiry_time},"status":"success"})),200

    except ValueError as e:
        return jsonify({
                    "message":"token validation failed"
                }),401


@app.route('/savepage',methods=['POST'])
def savepage():
    try:
        data = request.get_json()
        print(data)
        from datetime import datetime 
        json_to_insert={
            "email":data['email'],
            "diaryPageContent":data['diaryPageContent'],
            "createdAt": datetime.fromisoformat(data['createdAt'])
        }
        insert_diary_page(json_to_insert,data['createdAt'])
        
        return jsonify({
            "response":"saved successfully",
        }),200
    except Exception as e:
        print(e)
        return jsonify({
                    "response":"something went wrong "+str(e)
                }),500


@app.route('/gethistory',methods=['POST'])
def gethistory():
    try:
        data = request.get_json()
        # startdate,enddate, email,pageno, pagesize
        print(data)
        records=getdiaryhistory(data)

        result = list(records)

        print(result)
        
        return jsonify({
            "response": result
        }),200

    except Exception as e:
        print(e)
        return jsonify({
                    "response":"something went wrong "+str(e)
                }),500

from huggingface_hub import InferenceClient
@app.route('/chat',methods=['POST'])
def chatwithyourpast():
    try:
        query = request.form.get('prompt')
        useremail = request.form.get('email')
        source_information = getmatchedvectors(query,useremail)
        print(source_information)
        combined_information = f"Query: {query}\n Kindly answer the query with the following information:\n{source_information}.\n\n If you dont find any relavent information Ask the user for more detials."
        messages = [
            {"role": "system", "content": "You are a assitant to help me remember my past!"},
            {"role": "user", "content": combined_information},
        ]
        print(messages)



        client = InferenceClient(api_key=os.environ.get("Hf_token"))


        res = client.chat_completion(
            model="meta-llama/Meta-Llama-3-8B-Instruct",
            messages=messages,
            max_tokens=500,
            stream=False,
        )

        print(res.choices[0].message['content'])

        return jsonify({
            "response":res.choices[0].message['content']
        })

    except Exception as e:
        print(e)
        return jsonify({
                    "response":"something went wrong "+str(e)
                }),500


@app.route('/')
def test():
    return "hey working"

if __name__ == '__main__':
    app.run(port=80,host='0.0.0.0',debug=True)
