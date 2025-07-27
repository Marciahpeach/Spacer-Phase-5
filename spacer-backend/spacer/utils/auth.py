from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import jsonify
from spacer.models import User

def jwt_required_and_role(role=None):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            current_user = User.query.get(current_user_id)
            
            if not current_user:
                return jsonify({"error": "User not found"}), 404
            
            if role and current_user.role != role:
                return jsonify({"error": "Unauthorized access"}), 403
                
            return fn(current_user, *args, **kwargs)
        return wrapper
    return decorator