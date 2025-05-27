## 📝 README.md

````md
# 🧠 AI Image Classifier

A full-stack web app that allows users to upload an image and receive a prediction using a pretrained PyTorch model. Built with React (frontend) and FastAPI (backend).

## 🚀 Features

- Upload an image from the browser
- Classify image using ResNet18
- Full stack Docker support

## 📦 Tech Stack

- Frontend: React, JavaScript
- Backend: FastAPI, PyTorch, Pillow
- Deployment: Docker

## 🔧 Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```
````

### Frontend

```bash
cd frontend
npm install
npm start
```

To set up later:

## 🐳 Docker

```bash
cd backend
docker build -t ai-classifier-backend .
docker run -p 8000:8000 ai-classifier-backend
```
