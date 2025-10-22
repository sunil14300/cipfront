CipherStudio: A Full-Stack Browser-Based React IDE

Project Overview

CipherStudio is a browser-based, dark-themed online code editor built to simulate a modern Integrated Development Environment (IDE) environment. Users can create projects, manage multiple files (.js, .html, .css), edit code in a professional CodeMirror environment, and see the live output rendered in real-time.

This project was built following the specifications outlined in the CipherSchools Full Stack Assignment, focusing on robust file persistence (MongoDB/Express) and a highly professional user experience (Tailwind CSS, Autosave).

Key Features Implemented

Core Functionality: Create, load, and manage projects with a unique ID.

File Management: Create, rename, and delete multiple files (.html, .js, .css) within a project.

Real-Time Preview: Live rendering of the project output as code is typed.

Code Editor: Rich editing experience powered by CodeMirror with syntax highlighting and a dark theme.

Autosave (Bonus Feature): Changes are debounced and automatically saved to the backend API every 800ms, providing a seamless, worry-free editing experience.

Save Status: Visual feedback ("Unsaved changes...", "Saving...", "Saved") is provided to the user.

Professional UI/UX: A high-contrast, dark-mode design implemented using Tailwind CSS for a modern IDE feel.

LLM Integration: Backend endpoint is configured to interact with the OpenAI API for code generation (accessible via a future UI implementation).

Technical Stack

Component

Technology

Role

Frontend

React, Tailwind CSS

UI/UX, Component Management, CodeMirror Editor, API interaction.

Backend

Node.js, Express.js

REST API for project management, authentication, and LLM proxy.

Database

MongoDB / Mongoose

Persistent storage for users, projects, and file content.

Setup and Installation

This repository assumes a monorepo structure, with separate frontend and backend directories.

Prerequisites

Node.js (v18+)

MongoDB Instance (Local or MongoDB Atlas)

OpenAI API Key

1. Backend Setup

Navigate to the backend directory.

Install dependencies: npm install

Create a file named .env and configure it:

PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cipherstudio?retryWrites=true&w=majority
JWT_SECRET=YOUR_RANDOM_SECRET_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY


Start the server: npm start (or npm run dev if configured)
The server will run on http://localhost:5000.

2. Frontend Setup

Navigate to the frontend directory.

Install dependencies: npm install

Create a file named .env and configure the API URL:

# CRITICAL: This must point to the backend's address and port
REACT_APP_API_URL=http://localhost:5000/api 


Start the client application: npm start
The client will run on http://localhost:3000 (or the next available port).

Deployment Strategy

The application is designed for production deployment on modern hosting platforms.

Component

Recommended Service

Configuration

Frontend (React)

Vercel

Link GitHub repo, set Environment Variable REACT_APP_API_URL to the deployed backend endpoint.

Backend (Express)

Render or Railway

Link GitHub repo, set MONGO_URI, JWT_SECRET, and OPENAI_API_KEY Environment Variables.

<img width="1893" height="917" alt="Screenshot 2025-10-22 200412" src="https://github.com/user-attachments/assets/868d982e-7476-4e93-8ad1-0bc4e036fe66" />
![<img width="1888" height="926" alt="Screenshot 2025-10-22 200547" src="https://github.com/user-attachments/assets/df71b26a-a54a-41e9-b04b-7f7fc82a6e30" />
Uploading image.png…]()
