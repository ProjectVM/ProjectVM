FROM python:3.8

# Set the home directory to /root
ENV HOME /root

# cd into the home directory
WORKDIR /root

# Install nodes
RUN apt-get update --fix-missing
RUN apt-get install -y nodejs
RUN apt-get install -y npm

# Copy all app files into the image
COPY . .


# Download dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install "pymongo[srv]"
RUN npm install --legacy-peer-deps
RUN npm install react-router-dom
RUN npm install react-pro-sidebar

EXPOSE $PORT
CMD python server.py $PORT