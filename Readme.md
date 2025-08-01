t well please🚀 Spacer: Your Ultimate Space Booking Solution
Welcome to Spacer, a full-stack web application designed to simplify the booking and management of various spaces, such as meeting rooms, event venues, or co-working desks. Whether you're a client looking for the perfect spot or an administrator managing space availability and users, Spacer has you covered!

✨ Features
Space Discovery 🏢: Browse a list of available spaces with details like location, price, capacity, and amenities.

Effortless Booking 🗓️: Easily book a space for a specific time slot, linking it to a registered user.

User Management 🧑‍💻: (Admin) Add and view users with different roles (client, admin).

Space Management ⚙️: (Admin) Create, update, and manage spaces, including their availability, pricing, and images.

Booking Overview 📊: (Admin) View all bookings made across the platform.

User-Specific Bookings 👤: (Client) View bookings made by a specific user.

Responsive Design 📱: A clean, professional, and responsive user interface that works well on all devices.

🛠️ Technologies Used
Frontend:

React.js ⚛️: A JavaScript library for building user interfaces.

HTML5 & CSS3 🎨: For structuring and styling the web application. (Custom CSS, no Tailwind CSS)

Backend:

Flask 🐍: A lightweight Python web framework for the API.

SQLite 🗄️: A file-based SQL database for storing application data.

Flask-CORS 🌐: For handling Cross-Origin Resource Sharing between frontend and backend.

🚀 Getting Started
Follow these steps to get your Spacer application up and running on your local machine.

Prerequisites
Before you begin, ensure you have the following installed:

Python 3.8+

Node.js (LTS version recommended)

npm (Node Package Manager, usually comes with Node.js) or Yarn

Backend Setup
Clone the repository:

git clone <repository_url>
cd spacer-project/backend

Create a virtual environment (recommended):

python -m venv venv

Activate the virtual environment:

On macOS/Linux:

source venv/bin/activate

On Windows:

.\venv\Scripts\activate

Install backend dependencies:

pip install -r requirements.txt

(If requirements.txt is not provided, you'll need to install Flask, Flask-CORS, SQLAlchemy, etc., manually: pip install Flask Flask-CORS Flask-SQLAlchemy)

Initialize the database:
This will create the database.db file and necessary tables.

python init_db.py

(Note: The init_db.py script should be present in your backend directory, as provided in previous interactions. If not, you'll need to create it.)

Run the Flask backend server:

flask run

The backend server will typically run on http://127.0.0.1:5000.

Frontend Setup
Navigate to the frontend directory:

cd ../frontend

Install frontend dependencies:

npm install
# OR
yarn install

Run the React development server:

npm start
# OR
yarn start

The frontend application will typically open in your browser at http://localhost:3000 (or another available port).

💡 Usage
Once both the backend and frontend servers are running:

Home Page: Browse available spaces and use the "Test Backend Connection" button to verify the backend is active.

Admin Dashboard: Navigate to the "Admin Dashboard" to manage users, spaces, and view all bookings. You'll need to add at least one user (e.g., an admin) via the "Manage Users" section first.

Login Page: (Currently a placeholder for future authentication features)

Booking a Space: From the home page, click "Book Now" on any available space to open the booking form. Select a user (created in Admin Dashboard) and specify the booking times.

📁 Project Structure
spacer-project/
├── backend/
│   ├── app.py             # Flask application, API endpoints
│   ├── init_db.py         # Database initialization script
│   ├── database.db        # SQLite database file (generated after init_db.py)
│   └── requirements.txt   # Python dependencies
│
└── frontend/
    ├── public/
    │   └── index.html     # Main HTML file
    ├── src/
    │   ├── App.jsx        # Main React application component
    │   ├── style.css      # All custom CSS styles for the project
    │   └── components/
    │       ├── AdminDashboard.jsx
    │       ├── BookingForm.jsx
    │       ├── Login.jsx
    │       ├── SpaceList.jsx
    │       ├── SpaceManagement.jsx
    │       ├── UserBookings.jsx
    │       └── UserManagement.jsx
    ├── package.json       # Node.js dependencies and scripts
    └── ...                # Other React-related files

🗄️ Database Schema
The SQLite database (database.db) consists of three main tables:

users:

id (INTEGER, PRIMARY KEY)

username (TEXT, UNIQUE, NOT NULL)

email (TEXT, UNIQUE, NOT NULL)

password_hash (TEXT, NOT NULL)

role (TEXT, NOT NULL, DEFAULT 'client')

created_at (TEXT, DEFAULT CURRENT_TIMESTAMP)

spaces:

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

bookings:

id (INTEGER, PRIMARY KEY)

space_id (INTEGER, NOT NULL, FOREIGN KEY to spaces.id)

user_id (INTEGER, NOT NULL, FOREIGN KEY to users.id)

start_time (TEXT, NOT NULL)

end_time (TEXT, NOT NULL)

total_price (REAL, NOT NULL)

status (TEXT, NOT NULL, DEFAULT 'confirmed')

created_at (TEXT, DEFAULT CURRENT_TIMESTAMP)

🔗 API Endpoints (Backend)
The Flask backend provides the following RESTful API endpoints:

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
The frontend is styled using a custom style.css file, providing a professional and responsive design without relying on CSS frameworks like Tailwind CSS. All components use semantic class names that are defined in this central stylesheet.

🚀 Future Enhancements
User Authentication: Implement robust user login and session management.

User Roles & Permissions: Enhance role-based access control for different functionalities.

Booking Calendar/Availability: A visual calendar for checking space availability and making bookings.

Search & Filters: Add functionality to search and filter spaces by criteria like location, capacity, price, and amenities.

User Profiles: Allow users to manage their own profiles and view their booking history.

Payment Integration: Integrate a payment gateway for booking fees.

Admin Features: Add functionality to edit/delete users and spaces, and manage booking statuses.

Notifications: Implement email or in-app notifications for booking confirmations, cancellations, etc.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.