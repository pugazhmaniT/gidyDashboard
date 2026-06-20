Include set up , basic explanation of the project,What software is required .How to test the project in local .Include whatever required.Generate the fie immediately.# Gidy Audit Logs Dashboard
## Dashboard Preview

### Main Dashboard
![Dashboard Screenshot 1](./Dashboard(1).jpeg)

### Filtered Dashboard
![Dashboard Screenshot 2](./Dashboard(2).jpeg)

## Project Overview

Gidy Audit Logs Dashboard is a full-stack web application used to manage and analyze audit logs efficiently.

The dashboard allows users to:

* Upload audit logs using JSON files
* Store logs in MongoDB Atlas
* View logs in a structured dashboard
* Search logs
* Filter logs using multiple criteria
* Sort logs
* Paginate large datasets (10,000+ records)

This project helps security teams and administrators monitor suspicious activities, user actions, and system events.

---

# Features

## Backend Features

* Upload JSON log files
* Store logs in MongoDB
* REST APIs using Express.js
* Pagination support (20 records per page)
* Filtering support
* Sorting support
* Search functionality

## Frontend Features

* Attractive dashboard UI
* Search logs
* Apply filters
* Clear filters
* Sort records
* Upload JSON files
* Pagination controls
* Error/success messages in UI

---

# Tech Stack

## Frontend

* React.js
* Axios
* CSS

## Backend

* Node.js
* Express.js
* Mongoose

## Database

* MongoDB Atlas

---

# Software Required

Install the following software before running the project.

## 1. Node.js

Download and install from:

https://nodejs.org/

Check installation:

```bash
node -v
npm -v
```

---

## 2. Visual Studio Code

Download:

https://code.visualstudio.com/

---

## 3. MongoDB Atlas

Create account:

https://www.mongodb.com/cloud/atlas

---

## 4. Git

Download:

https://git-scm.com/

Check installation:

```bash
git --version
```

---

# Project Structure

```bash
gidy-assessment/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── assets/
│   └── package.json
│
└── README.md
```

---

# Database Schema

Each audit log contains:

```json
{
  "actor": "priya.nair@company.com",
  "role": "admin",
  "action": "DELETE_USER",
  "resource": "/api/users/334",
  "resourceType": "USER",
  "ipAddress": "192.168.1.45",
  "region": "ap-south-1",
  "severity": "HIGH",
  "status": "Unresolved",
  "timestamp": "2025-06-14T08:32:11Z"
}
```

---

# Setup Instructions

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd gidy-assessment
```

---

## Step 2: Setup Backend

Move to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Install required packages:

```bash
npm install express mongoose cors multer dotenv
```

---

## Step 3: Configure Environment Variables

Create `.env` file inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Example:

```env
PORT=5000
MONGO_URI=mongodb://username:password@cluster.mongodb.net/gidydb
```

---

## Step 4: Start Backend

```bash
node server.js
```

Expected output:

```bash
Server running on port 5000
MongoDB Connected
```

Backend runs at:

```bash
http://localhost:5000
```

---

## Step 5: Setup Frontend

Open new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install Axios:

```bash
npm install axios
```

---

## Step 6: Start Frontend

```bash
npm start
```

Frontend runs at:

```bash
http://localhost:3000
```

---

# How to Test the Project Locally

## Upload Logs

1. Open dashboard
2. Click **Choose File**
3. Select JSON file
4. Click **Upload File**

Expected:

* Logs stored in MongoDB
* Success message shown in UI

---

## Search Logs

Use search box.

Example:

```text
priya
```

Click Search.

Expected:
Only matching logs are displayed.

---

## Filter Logs

Available filters:

* Role
* Action
* Resource Type
* Region
* Severity
* Status

Expected:
Logs are filtered accordingly.

---

## Sorting

Sort by:

* Timestamp
* Severity
* Status

Order:

* Ascending
* Descending

---

## Pagination

* 20 logs per page
* Previous / Next buttons

Example:

```text
10000 logs / 20 per page = 500 pages
```

---

# API Endpoints

## Upload Logs

### POST

```bash
/api/logs/upload-file
```

Uploads JSON file and stores logs in MongoDB.

---

## Read Logs

### GET

```bash
/api/logs/read
```

Supports:

* page
* search
* filters
* sorting

Example:

```bash
/api/logs/read?page=1&severity=HIGH
```

---

# Git Commands

Initialize Git:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit"
```

Add remote repository:

```bash
git remote add origin <repository-url>
```

Push to GitHub:

```bash
git branch -M main
git push -u origin main
```

---

# Future Enhancements

Possible improvements:

* Authentication
* Role-based access
* Export CSV/PDF
* Charts and analytics
* Dark/Light mode
* Real-time monitoring
* Alerts for high severity logs

---

# Author

**Pugazhmani T**
B.E Computer Science Engineering
Software Engineer 
Chennai
