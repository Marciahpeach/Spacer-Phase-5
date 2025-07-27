# app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from spacer.config import Config
from spacer.extensions import db, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    JWTManager(app)
    CORS(app)
    
    # Import and register blueprints within app context
    with app.app_context():
        from spacer.routes.auth import auth_bp
        from spacer.routes.agreements import agreements_bp
        
        app.register_blueprint(auth_bp, url_prefix='/auth')
        app.register_blueprint(agreements_bp, url_prefix='/agreements')
    
    return app

app = create_app()