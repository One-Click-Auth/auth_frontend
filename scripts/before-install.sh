#!/bin/bash

# This script will run before the new version of your application is installed

# Stop and remove any existing Docker container
if [ "$(docker ps -aq -f name=test)" ]; then
    docker stop test
    docker rm test
fi

# Pull the latest image from ECR
docker pull 731664064493.dkr.ecr.ap-south-1.amazonaws.com/trustauthx:latest
