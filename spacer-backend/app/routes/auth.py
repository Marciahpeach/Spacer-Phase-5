from flask import Blueprint, request, jsonify
from app.models import db, Admin

auth_bp = Blueprint('auth_bp', __name__,url_prefix='/login')

@auth_bp.route('', methods=['POST'])
def login():
    data = request.get_json()
    admin = Admin.query.filter_by(email=data.get("email")).first()

    if admin and admin.check_password(data.get("password")):
        return jsonify({"message": "Login successful", "admin_id": admin.id}), 200
    return jsonify({"error": "Invalid credentials"}), 401
