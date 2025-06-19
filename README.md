# 🖼️ AI Image Classifier — Kubernetes MVP

This is a continuation of [ai-image-classifier](https://github.com/CanniJr/ai-image-classifier) that includes:

This project is a full-stack AI image classification application fully containerized and deployed inside Kubernetes.

## 🚀 Current Architecture (MVP `v2.0.0-k8s-mvp`)

- **Frontend:** React (Vite build), served via NGINX inside Kubernetes
- **Backend:** FastAPI (Python), serving an image classification model
- **Inference Model:** ImageNet classifier (torchvision pretrained model)
- **Containerized:** Docker
- **Orchestrated:** Kubernetes (Minikube local cluster)
- **Ingress:** NGINX Ingress Controller with host-based routing

---

## 🛠 Project Structure

```
├── backend/ # FastAPI backend + ML model
├── frontend/ # React frontend (Vite build)
├── k8s/ # Kubernetes manifests (deployment, service, ingress)
└── README.md
```

---

## 🌐 Local Kubernetes Deployment Guide

### 1️⃣ Start Minikube:

```bash
minikube start --driver=docker
minikube addons enable ingress
```

### 2️⃣ Build Docker images inside Minikube:

```bash
eval $(minikube docker-env)
docker build -t ai-backend:latest ./backend
docker build -t ai-frontend:latest ./frontend
```

### 3️⃣ Apply Kubernetes manifests:

```bash
kubectl apply -f k8s/
```

### 4️⃣ Start Ingress tunnel:

```bash
minikube tunnel
```

### 5️⃣ Map ai.local to localhost in `/etc/hosts`:

```bash
127.0.0.1 ai.local
```

### 6️⃣ Access the application:

Open your browser and go to [http://ai.local](http://ai.local)

✅ Upload an image, classify, and receive predictions.

🔭 In Progress (Phase 2 Development)
• vLLM integration (serve LLMs inside Kubernetes)
• SGLang orchestration for multi-step AI pipelines
• Cluster scaling and monitoring

The `main` branch reflects the latest stable MVP (`v2.0.0-k8s-mvp`).  
The `phase-2` branch contains ongoing experimental infrastructure enhancements.
⸻

Current Stable Tag: v2.0.0-k8s-mvp

⸻
