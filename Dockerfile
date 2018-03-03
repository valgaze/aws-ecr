FROM node:7.6

# Create directory
RUN mkdir -p /usr/app

# Set the working directory
WORKDIR /usr/app

# Copy source into image(different than mounting a volume: https://docs.docker.com/storage/bind-mounts/)
COPY app /usr/app


# Run this command when started
CMD [ "npm", "start" ]