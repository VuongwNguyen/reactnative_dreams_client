# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set environment variables
ENV API_URL=https://dreams-server-bmd-4sx0.onrender.com
ENV GOOGLE_WEB_CLIENT_ID=650950443769-ogc8o7mqb2viqkrct0ls5vqtt4ajei9n.apps.googleusercontent.com

# Build Android APK
RUN cd android && ./gradlew assembleRelease

# Expose metro bundler port
EXPOSE 8081

# Start metro bundler
CMD ["npm", "start"]