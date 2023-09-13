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
ENV PORT=3000
ENV NEXTAUTH_SECRET=99716a89356ebac0ad2b30d90d9df10b51fccb765f243d39f338725f2f8afdf1
ENV NEXTAUTH_URL=https://app.trustauthx.com/
ENV _ACCESS_KEY_ID=AKIA2UWUTT7W5HXUYIVJ
ENV _S3_BUCKET=openauthx
ENV _S3_REGION=ap-south-1
ENV _SECRET_ACCESS_KEY=BPqAxqwZVO7bgQd5+A8JAB74JFgaGJDPcD5B1LFu
RUN npm i sharp
RUN npm run build
EXPOSE 3000
# Start the Next.js application using npm start
CMD ["npm", "start"]
