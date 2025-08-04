# backend/app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import json
from werkzeug.security import generate_password_hash, check_password_hash # Import for password hashing

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Configure the database
# Using SQLite for simplicity. For production, consider PostgreSQL or MySQL.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # IMPORTANT CHANGE: Store hashed passwords, not plain text!
    password_hash = db.Column(db.String(128), nullable=False) 
    role = db.Column(db.String(20), default='client', nullable=False) # 'client' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    spaces = db.relationship('Space', backref='owner', lazy=True)
    bookings = db.relationship('Booking', backref='booker', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    # Method to set password (hashes it)
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Method to check password
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Define Space model
class Space(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price_per_hour = db.Column(db.Float, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, default=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    image_url = db.Column(db.String(500), nullable=True) # New: image_url field
    amenities = db.Column(db.JSON, nullable=True) # New: amenities field, stored as JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    bookings = db.relationship('Booking', backref='space', lazy=True)

    def __repr__(self):
        return f'<Space {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'description': self.description,
            'price_per_hour': self.price_per_hour,
            'capacity': self.capacity,
            'is_available': self.is_available,
            'owner_id': self.owner_id,
            'image_url': self.image_url, # Include image_url
            'amenities': self.amenities, # Include amenities
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Define Booking model
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending', nullable=False) # 'pending', 'confirmed', 'cancelled'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Booking {self.id} for Space {self.space_id} by User {self.user_id}>'

    def to_dict(self):
        # Calculate total price if not already set (e.g., on creation)
        # Ensure space and booker relationships are loaded before accessing their attributes
        space_name = self.space.name if self.space else None
        username = self.booker.username if self.booker else None

        # Recalculate total_price if space data is available and times are set
        calculated_total_price = self.total_price
        if self.space and self.start_time and self.end_time:
            duration_hours = (self.end_time - self.start_time).total_seconds() / 3600
            calculated_total_price = round(duration_hours * self.space.price_per_hour, 2)
        
        return {
            'id': self.id,
            'space_id': self.space_id,
            'space_name': space_name, # Include space name
            'user_id': self.user_id,
            'username': username, # Include username
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat(),
            'total_price': calculated_total_price, # Use calculated price
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Create database tables if they don't exist
with app.app_context():
    db.create_all()

    # Optional: Add a default admin user if no users exist
    if User.query.count() == 0:
        admin_user = User(username='admin', email='admin@example.com', role='admin')
        admin_user.set_password('adminpassword') # Set a strong default password here
        db.session.add(admin_user)
        db.session.commit()
        print("Default admin user created.")
    
    # Optional: Add a default client user if no users exist
    if User.query.filter_by(role='client').count() == 0:
        client_user = User(username='client', email='client@example.com', role='client')
        client_user.set_password('clientpassword') # Set a strong default password here
        db.session.add(client_user)
        db.session.commit()
        print("Default client user created.")

# --- API Endpoints ---

@app.route('/')
def hello_world():
    return jsonify(message='Hello from Flask Backend!')

# User Endpoints
@app.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(message="Invalid JSON"), 400
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password') # Get password from request
        role = data.get('role', 'client')

        if not username or not email or not password: # Password is now required
            return jsonify(message="Username, email, and password are required"), 400

        if User.query.filter_by(username=username).first():
            return jsonify(message="Username already exists"), 409
        if User.query.filter_by(email=email).first():
            return jsonify(message="Email already exists"), 409

        new_user = User(username=username, email=email, role=role)
        new_user.set_password(password) # Hash and set password
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message="User created successfully", user=new_user.to_dict()), 201
    else: # GET
        users = User.query.all()
        return jsonify(users=[user.to_dict() for user in users]), 200

@app.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == 'GET':
        return jsonify(user.to_dict()), 200
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify(message="Invalid JSON"), 400
        
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.role = data.get('role', user.role)
        if 'password' in data: # Allow password update
            user.set_password(data['password']) # Hash and set new password
        db.session.commit()
        return jsonify(message="User updated successfully", user=user.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify(message="User deleted successfully"), 200

# Space Endpoints
@app.route('/spaces', methods=['GET', 'POST'])
def handle_spaces():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(message="Invalid JSON"), 400

        name = data.get('name')
        location = data.get('location')
        description = data.get('description')
        price_per_hour = data.get('price_per_hour')
        capacity = data.get('capacity')
        is_available = data.get('is_available', True)
        owner_id = data.get('owner_id')
        image_url = data.get('image_url') # Get image_url from request
        amenities_str = data.get('amenities') # Get amenities string

        if not all([name, location, price_per_hour, capacity, owner_id is not None]):
            return jsonify(message="Name, location, price_per_hour, capacity, and owner_id are required"), 400
        
        if not isinstance(price_per_hour, (int, float)) or price_per_hour <= 0:
            return jsonify(message="Price per hour must be a positive number"), 400
        
        if not isinstance(capacity, int) or capacity <= 0:
            return jsonify(message="Capacity must be a positive integer"), 400
        
        owner = User.query.get(owner_id)
        if not owner:
            return jsonify(message="Owner user not found"), 404

        # Convert comma-separated amenities string to a JSON list
        amenities_list = [a.strip() for a in amenities_str.split(',') if a.strip()] if amenities_str else []

        new_space = Space(
            name=name,
            location=location,
            description=description,
            price_per_hour=price_per_hour,
            capacity=capacity,
            is_available=is_available,
            owner_id=owner_id,
            image_url=image_url, # Assign image_url
            amenities=amenities_list # Assign amenities as a list
        )
        db.session.add(new_space)
        db.session.commit()
        return jsonify(message="Space created successfully", space=new_space.to_dict()), 201
    else: # GET
        spaces = Space.query.all()
        return jsonify(spaces=[space.to_dict() for space in spaces]), 200

@app.route('/spaces/<int:space_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE'])
def handle_space(space_id):
    space = Space.query.get_or_404(space_id)
    if request.method == 'GET':
        return jsonify(space.to_dict()), 200
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify(message="Invalid JSON"), 400
        
        # Update all fields for PUT
        space.name = data.get('name', space.name)
        space.location = data.get('location', space.location)
        space.description = data.get('description', space.description)
        space.price_per_hour = data.get('price_per_hour', space.price_per_hour)
        space.capacity = data.get('capacity', space.capacity)
        space.is_available = data.get('is_available', space.is_available)
        space.owner_id = data.get('owner_id', space.owner_id)
        space.image_url = data.get('image_url', space.image_url) # Update image_url
        
        amenities_str = data.get('amenities')
        if amenities_str is not None:
            space.amenities = [a.strip() for a in amenities_str.split(',') if a.strip()]
        else:
            space.amenities = space.amenities # Keep existing if not provided

        db.session.commit()
        return jsonify(message="Space updated successfully", space=space.to_dict()), 200
    elif request.method == 'PATCH':
        data = request.get_json()
        if not data:
            return jsonify(message="Invalid JSON"), 400
        
        # Update only provided fields for PATCH
        if 'name' in data:
            space.name = data['name']
        if 'location' in data:
            space.location = data['location']
        if 'description' in data:
            space.description = data['description']
        if 'price_per_hour' in data:
            space.price_per_hour = data['price_per_hour']
        if 'capacity' in data:
            space.capacity = data['capacity']
        if 'is_available' in data:
            space.is_available = data['is_available']
        if 'owner_id' in data:
            space.owner_id = data['owner_id']
        if 'image_url' in data: # Update image_url
            space.image_url = data['image_url']
        if 'amenities' in data: # Update amenities
            amenities_str = data['amenities']
            space.amenities = [a.strip() for a in amenities_str.split(',') if a.strip()] if amenities_str else []

        db.session.commit()
        return jsonify(message="Space updated successfully", space=space.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(space)
        db.session.commit()
        return jsonify(message="Space deleted successfully"), 200

# Booking Endpoints
@app.route('/bookings', methods=['GET', 'POST'])
def handle_bookings():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(message="Invalid JSON"), 400
        
        space_id = data.get('space_id')
        user_id = data.get('user_id')
        start_time_str = data.get('start_time')
        end_time_str = data.get('end_time')

        if not all([space_id, user_id, start_time_str, end_time_str]):
            return jsonify(message="Space ID, User ID, Start Time, and End Time are required"), 400

        space = Space.query.get(space_id)
        user = User.query.get(user_id)

        if not space:
            return jsonify(message="Space not found"), 404
        if not user:
            return jsonify(message="User not found"), 404
        
        if not space.is_available:
            return jsonify(message="Space is currently unavailable for booking."), 409

        try:
            start_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
            end_time = datetime.fromisoformat(end_time_str.replace('Z', '+00:00'))
        except ValueError:
            return jsonify(message="Invalid date/time format. Use ISO 8601."), 400

        if start_time >= end_time:
            return jsonify(message="End time must be after start time"), 400

        # Check for overlapping bookings for the same space
        overlapping_bookings = Booking.query.filter(
            Booking.space_id == space_id,
            Booking.start_time < end_time,
            Booking.end_time > start_time
        ).first()

        if overlapping_bookings:
            return jsonify(message="Space is already booked for part of the requested time"), 409
        
        duration_hours = (end_time - start_time).total_seconds() / 3600
        total_price = round(duration_hours * space.price_per_hour, 2)

        new_booking = Booking(
            space_id=space_id,
            user_id=user_id,
            start_time=start_time,
            end_time=end_time,
            total_price=total_price,
            status='confirmed' # Automatically confirm for simplicity
        )
        db.session.add(new_booking)
        db.session.commit()

        # Mark space as unavailable immediately after booking
        space.is_available = False
        db.session.commit()

        return jsonify(message="Booking created successfully and space marked unavailable", booking=new_booking.to_dict()), 201
    else: # GET
        user_id = request.args.get('user_id')
        if user_id:
            bookings = Booking.query.filter_by(user_id=user_id).all()
        else:
            bookings = Booking.query.all()
        return jsonify(bookings=[booking.to_dict() for booking in bookings]), 200

@app.route('/bookings/<int:booking_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    if request.method == 'GET':
        return jsonify(booking.to_dict()), 200
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify(message="Invalid JSON"), 400
        
        booking.space_id = data.get('space_id', booking.space_id)
        booking.user_id = data.get('user_id', booking.user_id)
        
        start_time_str = data.get('start_time')
        end_time_str = data.get('end_time')

        if start_time_str:
            try:
                booking.start_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
            except ValueError:
                return jsonify(message="Invalid start_time format. Use ISO 8601."), 400
        if end_time_str:
            try:
                booking.end_time = datetime.fromisoformat(end_time_str.replace('Z', '+00:00'))
            except ValueError:
                return jsonify(message="Invalid end_time format. Use ISO 8601."), 400
        
        # Recalculate total price if times or space changed
        if booking.space and booking.start_time and booking.end_time:
            duration_hours = (booking.end_time - booking.start_time).total_seconds() / 3600
            booking.total_price = round(duration_hours * booking.space.price_per_hour, 2)

        booking.status = data.get('status', booking.status)
        
        db.session.commit()
        return jsonify(message="Booking updated successfully", booking=booking.to_dict()), 200
    elif request.method == 'DELETE':
        # When a booking is deleted, make the space available again
        space = Space.query.get(booking.space_id)
        if space:
            space.is_available = True
        db.session.delete(booking)
        db.session.commit()
        return jsonify(message="Booking deleted successfully and space marked available"), 200

# NEW LOGIN ENDPOINT
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify(message="Invalid JSON"), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify(message="Username and password are required"), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password): # Use check_password method
        # In a real application, you would generate and return a JWT token here
        return jsonify(message="Login successful", user=user.to_dict()), 200
    else:
        return jsonify(message="Invalid username or password"), 401 # Use 401 Unauthorized for invalid credentials

if __name__ == '__main__':
    app.run(debug=True)
