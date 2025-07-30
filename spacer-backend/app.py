from flask import Flask
from flask_cors import CORS
from models.booking import db  
from routes.space_routes import space_routes 
from routes.booking_routes import booking_routes 

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///spacer.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.register_blueprint(space_routes)
app.register_blueprint(booking_routes)
@app.route("/")
def home():
    return {"message": "Spacer backend running"}


if __name__ == "__main__":
    app.run(debug=True, port=5000)