bashCopy code
# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR main/public

# Copy the application files into the working directory
COPY . main/public

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]
