FROM node:latest
MAINTAINER Rafael Ballestiero <rafa.ballestiero@gmail.com>

# Prepare app directory
RUN mkdir -p /app
COPY . /app

# Install dependencies
WORKDIR /app
RUN npm run setup

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 8080
