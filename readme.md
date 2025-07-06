✝️ Royal Seed Chapel International - Church Website
This is the official church website for Royal Seed Chapel International, built to serve members and visitors with sermon videos, prayer request features, media gallery, and admin tools.

📌 Features
🎥 Watch and download sermon videos

🙏 Submit prayer requests with email & WhatsApp contact

🖼️ View church gallery (media)

🔐 Admin Dashboard

Upload & delete sermon videos

Upload & delete church images

View and respond to prayer requests

🛠️ Tech Stack
Frontend: HTML, CSS, Vanilla JavaScript

Backend: Node.js, Express.js

Database: MongoDB Atlas

Media Handling: Multer for file uploads

🚀 How to Run Locally
Clone this repository

bash
Copy
Edit
git clone https://github.com/your-username/royal-church-site.git
cd royal-church-site/backend
Install dependencies

bash
Copy
Edit
npm install
Create a .env file
Add your MongoDB URI:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
Run the server

bash
Copy
Edit
nodemon server.js
Open the frontend
Navigate to /public/index.html or open in your browser directly.

📁 Folder Structure
php
Copy
Edit
backend/
├── models/           # Mongoose schemas (sermon, prayer, media, admin)
├── routes/           # All route handlers (sermons, prayer, images)
├── uploads/          # Uploaded video/image files
├── server.js         # Main Express server
public/
├── index.html        # Main homepage
├── sermons.html      # Sermon video display page
├── request-prayer.html  # Prayer request form
├── view-requests.html   # Admin-only view of prayer requests
├── media.html        # Gallery of images
📩 Contact
Have questions or want to contribute?
📧 Email: royalchapel@example.com
📱 WhatsApp: +233 xxx xxx xxx

