from flask import Flask, request, jsonify
import os
import json
from flask_cors import CORS

from chat import ask_mahimaa

app = Flask(__name__)

CORS(app)


# ===========================================
# HOME
# ===========================================

@app.route("/")

def home():

    return jsonify({

        "status": "running",

        "assistant": "MahimaaAI",

        "message": "Backend is live."

    })


# ===========================================
# CHAT
# ===========================================

@app.route("/chat", methods=["POST"])

def chat():

    try:

        data = request.get_json()

        if not data:

            return jsonify({

                "success": False,

                "message": "No JSON received."

            }), 400

        user_message = data.get("message", "").strip()

        if not user_message:

            return jsonify({

                "success": False,

                "message": "Message cannot be empty."

            }), 400

        response = ask_mahimaa(user_message)

        return jsonify({

            "success": True,

            "response": response

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500

# ===========================================
# KNOWLEDGE FILES
# ===========================================

@app.route("/api/file/<filename>", methods=["GET"])
def get_knowledge_file(filename):

    file_path = os.path.join(
        "dataset",
        "knowledge",
        f"{filename}.json"
    )

    if not os.path.exists(file_path):
        return jsonify({
            "success": False,
            "message": "File not found."
        }), 404

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        return jsonify(data)

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
# ===========================================
# MAIN
# ===========================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )