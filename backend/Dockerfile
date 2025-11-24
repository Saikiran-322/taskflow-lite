# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Generate Prisma client inside the container
RUN npx prisma generate

# Expose backend port
EXPOSE 4000

# Start the backend
CMD ["npm", "run", "dev"]
