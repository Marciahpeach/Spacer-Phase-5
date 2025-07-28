# seed.py

from app import create_app
from app.models import db, Space

app = create_app()

with app.app_context():
    # Drop all existing data and recreate tables
    db.drop_all()
    db.create_all()

    # Create some seed spaces
    spaces = [
        Space(
            name="Creative Studio",
            location="Nairobi",
            description="A bright, modern space perfect for workshops and photo shoots.",
            price=5000.00,
            image="https://example.com/image1.jpg",
            capacity=20,
            amenities="Wi-Fi, Projector, Whiteboard",
            available=True
        ),
        Space(
            name="Rooftop Lounge",
            location="Westlands",
            description="Scenic rooftop venue ideal for networking events.",
            price=8000.00,
            image="https://example.com/image2.jpg",
            capacity=50,
            amenities="Bar, Sound System, Restrooms",
            available=True
        ),
        Space(
            name="Boardroom",
            location="Karen",
            description="Private boardroom suitable for executive meetings.",
            price=3500.00,
            image="https://example.com/image3.jpg",
            capacity=12,
            amenities="Air Conditioning, TV Screen, Coffee Machine",
            available=False
        )
    ]

    db.session.bulk_save_objects(spaces)
    db.session.commit()

    print("✅ Seed data inserted successfully!")
