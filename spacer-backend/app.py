# app.py
from flask import Flask
from flask_cors import CORS
from models import db
from routes.spaces import spaces_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///spacer.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Register Blueprint
app.register_blueprint(spaces_bp)

@app.route("/")
def home():
    return {"message": "Spacer backend running ✅"}

if __name__ == "__main__":
    app.run(debug=True)
