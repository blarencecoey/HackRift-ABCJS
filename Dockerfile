# Frontend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./


# Remove any windows-specific lock files that might have been copied
# and force fresh install for Linux environment
# ALSO remove ANY windows-specific dependencies (containing 'win32') from package.json
RUN rm -f package-lock.json && \
    sed -i '/win32/d' package.json && \
    npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]
