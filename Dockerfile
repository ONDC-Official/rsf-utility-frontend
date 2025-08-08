#FROM node:18-alpine as build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install -g serve
#COPY . .
#RUN npm run build
#EXPOSE 3000
#CMD ["serve", "-s", "build", "-l", "3000"]

FROM node:18-alpine as build

WORKDIR /app

# Copy only the package files first (to leverage Docker cache)
COPY package*.json ./

# Install local dependencies (this installs react-scripts too)
RUN npm install

# Optionally install serve globally if you're using it for the final image
RUN npm install -g serve

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Expose the port and serve the built app
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
