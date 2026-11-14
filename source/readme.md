🔗 URL Shortener

A fast and efficient URL Shortener built with Node.js, Express.js, MongoDB, and Redis. It converts long URLs into short, shareable links using Nano ID and uses Redis caching to improve redirect performance.

The application also supports Docker containerization for easier setup and deployment.

🚀 Features
Short URL Generation: Generate unique short links using Nano ID.
URL Redirection: Redirect users to their original destinations.
Click Tracking: Track clicks on shortened URLs.
MongoDB Integration: Persist URL data.
Redis Caching: Cache frequently accessed URLs for faster lookups.
Cache Expiration: Automatically expire cached URLs.
Docker Support: Containerize the application.
REST API: Organized API endpoints using Express.js.
Environment Configuration: Manage settings using dotenv.
🛠️ Tech Stack
Technology	Purpose
Node.js	JavaScript runtime
Express.js	Backend framework
MongoDB	Persistent database
Mongoose	MongoDB object modeling
Redis	In-memory caching
Nano ID	Unique short ID generation
Docker	Application containerization
Dotenv	Environment configuration
🏗️ Architecture

The application uses MongoDB for permanent URL storage and Redis as a caching layer.

URL Redirection Flow:

User requests a shortened URL.
Backend checks Redis for the shortcode.
Cache HIT: Original URL is retrieved directly from Redis.
Cache MISS: MongoDB is queried to retrieve the original URL.
Retrieved URL is cached in Redis.
Click count is incremented in MongoDB.
User is redirected to the original destination.
⚡ Performance Improvement

Redis caching significantly reduced the observed response time during local Postman testing.

Benchmark Results
Metric	Response Time
Redis Cache MISS	700 ms
Redis Cache HIT	234 ms
Time Saved	466 ms
Performance Improvement	66.57%

<details>
<summary>Performance calculation</summary>

700
−
234
700
×
100
=
66.57
%

The cached request was approximately 2.99× faster based on these measurements.

</details>

Key Achievement:

Reduced observed API response time by approximately 66.57%.
Saved approximately 466 ms per request in the initial comparison.
Avoided repeated MongoDB URL lookups through Redis caching.

Note: These are initial local testing observations, not controlled benchmark results. Actual performance may vary depending on database latency, network conditions, and server load.

📁 Project Structure
text
url_shortner/
│
├── source/
│   ├── config/
│   │   ├── db.js
│   │   └── config.js
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
│   ├── client.js
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
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

Create a .env file in the project root:

env
MONGO_URL=mongodb://localhost:27017/arnav-url-shortner
REDIS_URL=redis://localhost:6379
PORT=4000


Configure your MongoDB connection according to your environment.

5. Start Redis
bash
docker run -d --name redis-server -p 6379:6379 redis:7-alpine


Ensure MongoDB is also running.

6. Start the development server
bash
npm run dev


Server URL:

text
http://localhost:4000

🐳 Docker Setup
Build Docker image
bash
docker build -t url-shortener .

Start with Docker Compose
bash
docker compose up --build -d

Check running containers
bash
docker compose ps

View logs
bash
docker compose logs -f

Stop containers
bash
docker compose down


Ensure your Docker Compose configuration supplies the required MongoDB and Redis connection environment variables.

📡 API Endpoints
1. Create Short URL

Method: POST

Endpoint: /arnav/short

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
  "shorturl": "Ab12xyz",
  "click": 0
}

2. Redirect to Original URL

Method: GET

Endpoint: /arnav/:shortcode

Example:

text
http://localhost:4000/arnav/Ab12xyz


Responses:

302 Found – Redirects to the original URL.
404 Not Found – Shortcode does not exist.
500 Internal Server Error – Unexpected server error.
🧪 Testing

The application can be tested using Postman.

Method	Endpoint	Purpose
POST	/arnav/short	Create short URL
GET	/arnav/:shortcode	Redirect to original URL

Verify Redis caching:

bash
docker exec -it redis-server redis-cli


Check cached URL:

redis
GET your_shortcode


Check expiration:

redis
TTL your_shortcode

🔮 Future Improvements
Custom short URL aliases.
URL expiration and automatic cleanup.
User authentication and authorization.
Advanced click analytics.
Rate limiting using Redis.
QR code generation.
URL validation and security enhancements.
Production deployment and monitoring.
👨‍💻 Author

Arnav Kulkarni
used ai for some purposes

Backend Development Project

Built to explore backend development, REST APIs, MongoDB, Redis caching, performance optimization, and Docker containerization.

⭐ If you find this project useful, consider giving it a star!
