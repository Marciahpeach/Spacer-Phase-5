# 🌌 Spacer Platform

A full-stack platform that connects people with unique spaces for events, meetings, co-working, and celebrations. Admins can manage spaces and users, while clients can browse, book, and interact with listings in real-time.

---

## 📂 Project Structure
Spacer-Platform/
├── spacer-frontend/ # React + Tailwind frontend
├── spacer-backend/ # Flask backend with RESTful API
└── README.md


---

## ⚙️ Tech Stack

| Layer      | Tech                                |
|------------|-------------------------------------|
| Frontend   | React, React Router, Tailwind CSS   |
| Backend    | Flask, Flask-CORS, SQLAlchemy       |
| Database   | SQLite (dev), PostgreSQL (prod)     |
| API Comm.  | RESTful, Axios                      |

---

## 🚀 Features

### 👤 Client
- View all available spaces
- See space details
- Book a space (with availability updates)
- Booking confirmation with UI feedback

### 🛠 Admin
- Add/Edit/Delete spaces
- Control space availability

---

## 🔌 Installation

### 🔹 Backend Setup (Flask)

```bash
cd spacer-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db init
flask db migrate
flask db upgrade
flask run

🔹 Frontend Setup (React + Tailwind)
cd spacer-frontend
npm install
npm run dev

🌐 API Endpoints
📄 Spaces
Method	Endpoint	Description
GET	/api/spaces	Get all spaces
GET	/api/spaces/<id>	Get space by ID
POST	/api/spaces	Add new space (admin)
PATCH	/api/spaces/<id>/book	Book a space (client)

🖼️ Screenshots
🏠 Home Page

🧾 Booking Page

🛠 Admin Dashboard

🛠 Login Dasboard


Add real screenshots in docs/screenshots/

✅ Booking Flow
User selects a space

User fills out booking form

Booking triggers PATCH /api/spaces/<id>/book

Space status becomes available: false

Confirmation + redirect

🔐 Environment Variables
For local .env usage:
# Flask (in .flaskenv)
FLASK_APP=app.py
FLASK_ENV=development

# React (in .env)
VITE_API_URL=http://localhost:5000/api


🛡️ CORS Setup (Backend)
Ensure this is in app.py:
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

Deployed Links
1.Frontend
https://spacer-phase-5-gamma.vercel.app/

2.Backend
https://spacer-phase-5-5.onrender.com
## Note  the backend  seems to have issues when  trying to deploy


Presentation Link
https://docs.google.com/presentation/d/1JO0ofpYWM4-Qe3yZAKywp-5Lr_HoG4v4cBv63vUlvUo/edit?usp=sharing

❤️ Credits
Built with love by Marciah Ayora and collaborators.
Inspired by platforms like Peerspace and Airbnb.

📬 Contact
Email: your-email@example.com

LinkedIn: linkedin.com/in/yourname
