# Auth Service Dockerfile (Lightweight)
FROM python:3.10-slim

WORKDIR /app

# Copy only requirements first for caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (will be overridden by Railway, but good practice)
EXPOSE 8000

# Start command
CMD ["uvicorn", "user_api:app", "--host", "0.0.0.0", "--port", "8000"]
