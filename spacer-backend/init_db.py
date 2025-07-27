# init_db.py
from app import app, db
from spacer.models.user import User
from spacer.models.agreement import Agreement
from spacer.models.billing import Billing

def init_database():
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Create test users
        landlord = User(email='landlord@test.com', role='landlord')
        landlord.set_password('password123')
        
        tenant = User(email='tenant@test.com', role='tenant')
        tenant.set_password('password123')
        
        db.session.add(landlord)
        db.session.add(tenant)
        db.session.commit()
        
        print("Database initialized successfully!")

if __name__ == '__main__':
    init_database()