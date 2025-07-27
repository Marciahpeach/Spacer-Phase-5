from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from spacer.extensions import db
from spacer.models import User
import bcrypt
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    from spacer.extensions import db  
    from spacer.models.user import User
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'tenant')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(email=email, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity=user.id,
        additional_claims={
            'email': user.email,
            'role': user.role
        },
        expires_delta=timedelta(hours=1)
    )
    
    return jsonify(access_token=access_token)

@auth_bp.route('/google', methods=['POST'])
def google_login():
    data = request.get_json()
    email = data.get('email')
    google_id = data.get('google_id')

    if not email or not google_id:
        return jsonify({"error": "Email and Google ID required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email, google_id=google_id, role='tenant')
        db.session.add(user)
        db.session.commit()

    access_token = create_access_token(
        identity=user.id,
        additional_claims={
            'email': user.email,
            'role': user.role
        },
        expires_delta=timedelta(hours=1)
    )
    
    return jsonify(access_token=access_token)