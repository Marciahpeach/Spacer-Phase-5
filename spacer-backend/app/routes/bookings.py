# app/routes/bookings.py

from flask import Blueprint

bookings_bp = Blueprint('bookings', __name__,url_prefix='/bookings')

@bookings_bp.route('',methods=['GET'])
def get_bookings():
    return {"message": "Bookings endpoint"}
