FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g serve
COPY . .
# Accept build args from docker-compose
ARG REACT_APP_CLIENT_ID
ARG REACT_APP_BACKEND_URL

# Make them available as ENV inside build
ENV REACT_APP_CLIENT_ID=$REACT_APP_CLIENT_ID
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
