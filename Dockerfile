# Use a Linux distribution that supports glibc (e.g., Ubuntu)
FROM debian:latest

# Install required dependencies (cURL, Git, OpenSSH, Node.js, and NPM)
RUN apt-get update && \
    apt-get install -y curl git openssh-client nodejs npm

# Set the working directory
WORKDIR /app

# Optionally, you can download and install the latest Node.js and NPM versions manually.
# If you want to use a specific version, replace 'latest' with the desired version, e.g., '14.x'

# Install Node.js and NPM
RUN curl -fsSL https://deb.nodesource.com/setup_latest.x | bash - && \
    apt-get install -y nodejs

# Optionally, you can set up the SSH key for Git here. Make sure to add the private key
# and adjust the following lines accordingly.

# Copy the SSH private key to the container
COPY ./temp_rsa /root/.ssh/id_rsa

# Set the correct permissions for the private key
RUN chmod 600 /root/.ssh/id_rsa

# Add your Git host to the list of known hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# Optionally, you can download your build runner here. Replace the following line with the
# appropriate download command for your build runner.

# Or, if you just want to use this container for building, you can use /bin/bash or any other shell:
# ENTRYPOINT ["/bin/bash"]

# Start the container
CMD ["bash"]
