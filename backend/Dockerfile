FROM python:3.12

# Set working directory
WORKDIR /app

# Copy all backend files
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Expose port (optional)
EXPOSE 8000

# Run FastAPI with uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]