# Rec Service Dockerfile (Heavy, optimized for CPU)
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies if needed (e.g. for build tools)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy rec-requirements
COPY requirements.txt .

# Install dependencies (CPU-only torch from index)
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Start command using shell form to allow variable expansion
CMD uvicorn app:app --host 0.0.0.0 --port ${PORT:=8000}
