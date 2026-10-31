
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(
    title="AWS Starter API",
    description="My first AWS deployment project",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AWS Starter API!",
        "status": "running"
    }

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "backend": "FastAPI",
        "time": datetime.now().isoformat()
    }

@app.get("/api/message")
def get_message():
    return {
        "message": "Hello from FastAPI Backend!",
        "technology": "React + FastAPI",
        "deployment": "Coming Soon"
    }
