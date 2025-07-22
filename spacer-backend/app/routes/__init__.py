from flask import Blueprint

# Correct these imports to match the actual filenames
from .auth import auth_bp
from .spaces import spaces_bp
from .bookings import bookings_bp

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(spaces_bp)
    app.register_blueprint(bookings_bp)
