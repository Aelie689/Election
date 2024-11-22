# Use the official Node.js image to build the frontend
FROM node:18 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the frontend
RUN npm run build

# Use an Nginx image to serve the built files
FROM nginx:1.24

# Copy the built frontend from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
