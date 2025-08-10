# Easy Notes App

A full-stack notes taking application built with **Next.js** frontend and **FastAPI** backend, featuring user authentication, CRUD notes, and custom UI components styled with Tailwind CSS.

---

## Tech Stack

- **Frontend:**  
  - Framework: Next.js (React)  
  - State Management: Zustand  
  - API calls: Axios  
  - Styling: Tailwind CSS (custom components, no UI libraries)  
  - Optional: Framer Motion for animations (if added)  

- **Backend:**  
  - Framework: FastAPI (Python)  
  - Database: MongoDB  
  - Authentication: JWT tokens  
  - API: RESTful endpoints for users and notes management  

- **Other:**  
  - Containerization: Docker (for both frontend and backend)  
  - Version Control: Git, hosted on GitHub  

---

## Project Overview

This app allows users to:

- Register and log in securely via JWT authentication  
- Create, view, edit, and delete notes  
- Notes have titles and content stored in MongoDB  
- All UI elements are hand-coded with Tailwind CSS — no pre-made UI kits  
- Runs locally using Docker for an easy and consistent development environment  

---

## How It Works

- The frontend (Next.js) manages UI and user interaction, storing auth tokens and notes state using Zustand.  
- Axios is used to call backend API endpoints for login/signup and notes CRUD.  
- The backend (FastAPI) exposes REST endpoints and handles user authentication, token issuance, and notes storage/retrieval in MongoDB.  
- JWT tokens protect routes and ensure only authorized users can access their notes.  
- Docker Compose sets up the MongoDB, backend API, and frontend app containers for local development.  

---

## Installation and Running Locally

### Prerequisites

- Docker and Docker Compose installed on your system

### Steps

1. Clone the repo:

```bash
git clone https://github.com/vishnu0403/easy-notes-app.git
cd easy-notes-app

2.**Create a .env file inside the backend folder with these variables:**

MONGO_URI=mongodb://mongo:27017/notesdb
JWT_SECRET=your_jwt_secret_key


3. **Start the app with Docker Compose:**

docker-compose up --build

4.**Access the app in your browser:**

Frontend: http://localhost:3000

Backend API: http://localhost:8000/docs (FastAPI Swagger UI)


5.**Folder Structure**

/backend        # FastAPI backend code and configs
  ├─ app/
      ├─ main.py
      ├─ models.py
      ├─ routes/
      ├─ auth.py
  ├─ requirements.txt
  ├─ Dockerfile

/frontend       # Next.js frontend code
  ├─ components/
  ├─ pages/
  ├─ store/
  ├─ styles/
  ├─ Dockerfile

docker-compose.yml
README.md


6.**Design Decisions and Trade-offs**

MongoDB chosen for flexibility in note content schema and ease of scaling

Zustand selected for lightweight state management suitable for this small app

No UI component libraries used to comply with assignment restrictions, styled fully using Tailwind CSS

JWT authentication chosen for stateless, scalable session handling

Docker used to ensure easy setup and consistent environment across different machines

Did not implement rich-text editor or complex animations to prioritize core functionality and code clarity


Vishnu Sakaray
vishnusakaray@gmail.com
