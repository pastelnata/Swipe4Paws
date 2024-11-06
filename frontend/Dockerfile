# Stage 1: Build the Angular app
FROM node:18 AS build

# Set working directory to /frontend
WORKDIR /frontend

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files to the working directory
COPY . .

# Build the Angular app in production mode
RUN ng build --configuration production

# Stage 2: Serve the Angular app with http-server
FROM node:18 AS serve

# Install http-server globally
RUN npm install -g http-server

# Set working directory to /frontend
WORKDIR /frontend

# Copy the built Angular app from the build stage
COPY --from=build /frontend/dist/swipe4paws /frontend/dist/swipe4paws

# Expose port 8080 for http-server
EXPOSE 8080

# Run http-server to serve the Angular app
CMD ["http-server", "dist", "-p", "8080", "--cors"]