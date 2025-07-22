# app/routes/bookings.py

from flask import Blueprint

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/bookings')
def get_bookings():
    return {"message": "Bookings endpoint"}
