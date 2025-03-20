🚀 Number API Backend

This is a Node.js backend that fetches numbers from a third-party API and maintains a sliding window of the last 10 unique numbers. The server calculates the average of numbers in the window and provides real-time updates.

🛠️ Tech Stack

Backend: Node.js, Express.js

HTTP Client: Axios

Authentication: Bearer Token

Environment: Node.js (v16+ recommended)

📉 Setup and Installation

1️⃣ Clone the Repository

2️⃣ Install Dependencies

3️⃣ Environment Variables

Create a .env file in the root directory and add:

4️⃣ Run the Server

Or, for development mode with auto-restart:

🔥 API Endpoints

1️⃣ Fetch Numbers from Third-Party API

Method

Endpoint

Description

GET

/numbers/:numberid

Fetch numbers of type p, f, e, r

Number Types:

p → Prime numbers

f → Fibonacci numbers

e → Even numbers

r → Random numbers

Example Request:

Example Response:

📉 Project Functionality

Fetches Numbers – The server calls a third-party API to retrieve numbers based on the type (p, f, e, r).

Maintains a Sliding Window – Only the last 10 unique numbers are stored.

Removes Duplicates – If the API returns duplicates, they are ignored.

Calculates Average – Computes the average of numbers in the current window.

📉 Deployment

Deploy on Vercel

Install Vercel CLI:

Run:

Follow the prompts to deploy!

📉 Git & Version Control

Ignore node_modules/ Before Pushing

Push to GitHub

🛠️ Known Issues

API may return Authorization Required if the token is missing.

Ensure .env file is properly configured.

The third-party API must respond within 500ms, or it will be ignored.

📉 Contributors

Sahil Adhikari - RA2211027010002

Contributor 2

🐝 License

This project is licensed under the MIT License.
