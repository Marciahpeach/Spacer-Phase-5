🚀 Spacer: Your Ultimate Space Booking Solution
Welcome to Spacer, a full-stack web application designed to simplify the booking and management of various spaces, such as meeting rooms, event venues, or co-working desks. Whether you're a client looking for the perfect spot or an administrator managing space availability and users, Spacer has you covered!

✨ Key Features
Space Discovery 🏢: Browse available spaces with essential details like location, price, capacity, and amenities.

Effortless Booking 🗓️: Easily book a space for a specific time slot, linked to a registered user.

User Management 🧑‍💻: (Admin) Add and view users with different roles (client, admin).

Space Management ⚙️: (Admin) Create, update, and manage spaces, including their availability, pricing, and images.

Booking Overview 📊: (Admin) View all bookings made across the platform.

User-Specific Bookings 👤: (Client) View bookings made by a specific user.

Responsive Design 📱: A clean, professional, and responsive user interface for all devices.

🛠️ Technologies Used
Frontend:
React.js ⚛️: Building dynamic user interfaces.

HTML5 & CSS3 🎨: Structuring and styling with custom CSS.

Backend:
Flask 🐍: A lightweight Python web framework for the API.

SQLite 🗄️: A file-based SQL database for data storage.

Flask-CORS 🌐: Handling Cross-Origin Resource Sharing.

🚀 Getting Started
Follow these steps to get Spacer running on your local machine.

Prerequisites
Python 3.8+

Node.js (LTS recommended) & npm (or Yarn)

Backend Setup
Clone the repository:

git clone <repository_url>
cd spacer-project/backend

Create & activate a virtual environment:

python -m venv venv
# On macOS/Linux: source venv/bin/activate
# On Windows: .\venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

(If requirements.txt is missing, install Flask, Flask-CORS, Flask-SQLAlchemy manually.)

Initialize the database:

python init_db.py

(Ensures database.db and tables are created.)

Run the Flask server:

flask run

(Server runs on http://127.0.0.1:5000)

Frontend Setup
Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install
# OR yarn install

Run the React development server:

npm start
# OR yarn start

(App opens in browser at http://localhost:3000)

📁 Project Structure
spacer-project/
├── backend/
│   ├── app.py             # Flask application, API endpoints
│   ├── init_db.py         # Database initialization script
│   ├── database.db        # SQLite database file (generated)
│   └── requirements.txt   # Python dependencies
│
└── frontend/
    ├── public/
    │   └── index.html     # Main HTML file
    ├── src/
    │   ├── App.jsx        # Main React application component
    │   ├── style.css      # All custom CSS styles
    │   └── components/    # React components
    │       ├── AdminDashboard.jsx
    │       ├── BookingForm.jsx
    │       ├── Login.jsx
    │       ├── SpaceList.jsx
    │       ├── SpaceManagement.jsx
    │       ├── UserBookings.jsx
    │       └── UserManagement.jsx
    ├── package.json       # Node.js dependencies and scripts
    └── ...                # Other React files

🗄️ Database Schema
users table:
id (INTEGER, PRIMARY KEY)

username (TEXT, UNIQUE, NOT NULL)

email (TEXT, UNIQUE, NOT NULL)

password_hash (TEXT, NOT NULL)

role (TEXT, NOT NULL, DEFAULT 'client')

created_at (TEXT, DEFAULT CURRENT_TIMESTAMP)

spaces table:
id (INTEGER, PRIMARY KEY)

name (TEXT, NOT NULL)

location (TEXT, NOT NULL)

description (TEXT)

price_per_hour (REAL, NOT NULL)

capacity (INTEGER, NOT NULL)

owner_id (INTEGER, NOT NULL, FOREIGN KEY to users.id)

is_available (BOOLEAN, NOT NULL, DEFAULT TRUE)

image_url (TEXT)

amenities (TEXT) - stored as a comma-separated string

created_at (TEXT, DEFAULT CURRENT_TIMESTAMP)

bookings table:
id (INTEGER, PRIMARY KEY)

space_id (INTEGER, NOT NULL, FOREIGN KEY to spaces.id)

user_id (INTEGER, NOT NULL, FOREIGN KEY to users.id)

start_time (TEXT, NOT NULL)

end_time (TEXT, NOT NULL)

total_price (REAL, NOT NULL)

status (TEXT, NOT NULL, DEFAULT 'confirmed')

created_at (TEXT, DEFAULT CURRENT_TIMESTAMP)

🔗 API Endpoints (Backend)
GET /: Basic connection test.

GET /users: Get all users.

POST /users: Add a new user.

GET /spaces: Get all spaces.

POST /spaces: Add a new space.

PATCH /spaces/<int:space_id>: Update a space's availability.

GET /bookings: Get all bookings (or filter by user_id).

POST /bookings: Create a new booking.

POST /login: User login (basic, currently returns success message).

🎨 Styling
The frontend is styled using a custom style.css file, providing a professional and responsive design without relying on CSS frameworks. All components use semantic class names defined in this central stylesheet.

🚀 Future Enhancements
User Authentication: Implement robust user login and session management.

User Roles & Permissions: Enhance role-based access control.

Booking Calendar/Availability: A visual calendar for checking availability.

Search & Filters: Add functionality to search and filter spaces.

User Profiles: Allow users to manage their profiles and view booking history.

Payment Integration: Integrate a payment gateway.

Admin Features: Add functionality to edit/delete users/spaces, and manage booking statuses.

Notifications: Implement email or in-app notifications.

Deployed links
1.Frontend
https://vercel.com/marciahpeachs-projects/spacer-phase-5

2.Backend
https://spacer-phase-5-6.onrender.com

3.Presentation link
https://docs.google.com/presentation/d/1JO0ofpYWM4-Qe3yZAKywp-5Lr_HoG4v4cBv63vUlvUo/edit?usp=sharing


🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.