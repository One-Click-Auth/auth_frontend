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
ARG ACCESS_KEY_ID
ARG S3_BUCKET
ARG S3_REGION
ARG SECRET_ACCESS_KEY
ARG NEXT_PUBLIC_AES_KEY
ENV PORT=3000
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV _ACCESS_KEY_ID=$ACCESS_KEY_ID
ENV _S3_BUCKET=$S3_BUCKET
ENV _S3_REGION=$S3_REGION
ENV _SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
ENV NEXT_PUBLIC_AES_KEY
RUN npm i sharp
RUN npm run build
EXPOSE 3000
# Start the Next.js application using npm start
CMD ["npm", "start"]
