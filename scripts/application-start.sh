#!/bin/bash


docker run -d \
    --name test \
    -p 3000:3000 \
    731664064493.dkr.ecr.ap-south-1.amazonaws.com/trustauthx:latest