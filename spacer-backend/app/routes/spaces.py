from flask import Blueprint, request, jsonify
from app.models import db, Space

spaces_bp = Blueprint("spaces", __name__, url_prefix="/spaces")

@spaces_bp.route('', methods=["POST"])
def add_space():
    data = request.get_json()
    if not data.get("name") or not data.get("location"):
        return jsonify({"error": "Missing required fields"}), 400

    new_space = Space(
        name=data["name"],
        location=data["location"],
        description=data.get("description", ""),
        image=data.get("image", ""),
        price=float(data.get("price", 0)),
        capacity=int(data.get("capacity", 0)),
        amenities=data.get("amenities", ""),
        available=True
    )

    db.session.add(new_space)
    db.session.commit()
    return jsonify(new_space.to_dict()), 201

@spaces_bp.route('/debug', methods=["GET"])
def debug_spaces():
    spaces = Space.query.all()
    return jsonify([space.id for space in spaces]), 200

# PATCH /api/spaces/<int:space_id>
@spaces_bp.route('/<int:space_id>/book', methods=["PATCH"])
def book_space(space_id):
    data = request.get_json()

    space = Space.query.get(space_id)
    if not space:
        return jsonify({"error": "Space not found"}), 404

    if "available" not in data:
        return jsonify({"error": "Missing 'available' field"}), 400

    space.available = data["available"]
    db.session.commit()

    return jsonify(space.to_dict()), 200


