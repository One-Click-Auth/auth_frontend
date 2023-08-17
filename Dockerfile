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
RUN npm run build
EXPOSE 3000
# Start the Next.js application using npm start
CMD ["npm", "start"]
server {
listen 80;
server_name app.trustauthx.com;
# Redirect HTTP to HTTPS
location / {
return 301 https://$host$request_uri;
}
}
server {
listen 443 ssl;
server_name app.trustauthx.com;
ssl_certificate /etc/letsencrypt/live/app.trustauthx.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/app.trustauthx.com/privkey.pem;
ssl_trusted_certificate /etc/letsencrypt/live/app.trustauthx.com/chain.pem;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256>
# Add other SSL settings as needed (e.g., HSTS, OCSP stapling)
location / {
proxy_pass http://localhost:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
nextjs
2
}
}
