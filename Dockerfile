FROM python:3.8

# Set the home directory to /root
ENV HOME /root

# cd into the home directory
WORKDIR /root

# Install nodes
RUN apt-get update --fix-missing
RUN apt-get install -y nodejs
RUN apt-get install -y npm

# Install supervisor
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor

# Copy all app files into the image
COPY . /root/

# Download dependencies
RUN pip install --upgrade pip
RUN pip install -r $HOME/requirements.txt
RUN pip install "pymongo[srv]"

# Expose frontend to Heroku
EXPOSE 22 $PORT 5000
CMD ["/usr/bin/supervisord"]
