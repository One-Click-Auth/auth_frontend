# Use an official Node.js runtime as the base image
FROM node:18-alpine
# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG _ACCESS_KEY_ID
ARG _S3_BUCKET
ARG _S3_REGION
ARG _SECRET_ACCESS_KEY
ENV PORT=3000
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV _ACCESS_KEY_ID=$_ACCESS_KEY_ID
ENV _S3_BUCKET=$_S3_BUCKET
ENV _S3_REGION=$_S3_REGION
ENV _SECRET_ACCESS_KEY=$_SECRET_ACCESS_KEY
RUN npm i sharp
RUN npm run build
EXPOSE 3000
# Start the Next.js application using npm start
CMD ["npm", "start"]
