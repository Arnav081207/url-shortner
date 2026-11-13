🔗 URL Shortener

A simple and efficient URL Shortener built using Node.js, Express.js, and MongoDB. It converts long URLs into short, shareable links using unique IDs generated with Nano ID.

🚀 Features
Create short URLs from long URLs.
Generate unique short codes using Nano ID.
Redirect short URLs to their original destinations.
Track the number of clicks on each short URL.
Store URL information in MongoDB.
REST API architecture.
🛠️ Tech Stack
Node.js – JavaScript runtime
Express.js – Backend framework
MongoDB – Database
Mongoose – MongoDB object modeling
Nano ID – Unique short ID generation
Dotenv – Environment variable management





📁 Project Structure
text
url_shortner/
│
├── source/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── urlController.js
│   │
│   ├── model/
│   │   └── url.model.js
│   │
│   ├── routes/
│   │   └── route.js
│   │
│   ├── app.js
│   └── config.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

⚙️ Installation & Setup
1. Clone the repository
bash
git clone YOUR_REPOSITORY_URL

2. Navigate to the project
bash
cd url_shortner

3. Install dependencies
bash
npm install

4. Configure environment variables

Create a .env file in the root directory:

env
MONGO_URL=mongodb://localhost:27017/arnav-url-shortner
PORT=4000


Make sure MongoDB is installed and running.

5. Start the development server
bash
npm run dev


Server will run at:

text
http://localhost:4000

📡 API Endpoints
1. Create Short URL

Endpoint: POST /arnav/short

Creates a short URL from the provided original URL.

Request Body:

json
{
  "url": "https://www.google.com"
}


Example Response:

json
{
  "_id": "your_document_id",
  "originalurl": "https://www.google.com",
  "shorturl": "Ab12",
  "click": 0
}

2. Redirect to Original URL

Endpoint: GET /arnav/:shortcode

Redirects the user to the original URL associated with the short code.

Example:

text
http://localhost:4000/arnav/Ab12


If the short code exists, the user is redirected to the original URL and the click counter increases by one.

If the short code does not exist, the API returns a 404 Not Found response.

🧪 Testing

You can test the API using Postman.

Method	Endpoint	Purpose
POST	/arnav/short	Create short URL
GET	/arnav/:shortcode	Redirect to original URL
📈 Future Improvements
Custom short URL aliases.
URL expiration functionality.
User authentication.
Analytics dashboard.
Better URL validation.
QR code generation.
👨‍💻 Author  also this project is made with help of ai and is beginner friendly so give valuable feedback 

Arnav Kulkarni

Built as a backend development project to practice Node.js, Express.js, MongoDB, and REST API development.

⭐ If you find this project useful, consider giving it a star!
