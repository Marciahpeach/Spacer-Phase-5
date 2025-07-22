from flask import Blueprint, request, jsonify
from app.models import db, Space

spaces_bp = Blueprint("spaces", __name__, url_prefix="/spaces")

@spaces_bp.route("/", methods=["POST"])
def add_space():
    data = request.get_json()

    if not data.get("name") or not data.get("location"):
        return jsonify({"error": "Missing required fields"}), 400

    new_space = Space(
        name=data["name"],
        location=data["location"],
        description=data.get("description", ""),
        image_url=data.get("image", ""),
        price=float(data.get("price", 0)),
        capacity=int(data.get("capacity", 0)),
        amenities=data.get("amenities", ""),
        available=bool(data.get("available", True))
    )

    db.session.add(new_space)
    db.session.commit()

    return jsonify(new_space.to_dict()), 201
