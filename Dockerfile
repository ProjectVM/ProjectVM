FROM python:3.8

# Set the home directory to /root
ENV HOME /root

# cd into the home directory
WORKDIR /root

# Copy all app files into the image
COPY . .

# Download dependencies
RUN pip install -r requirements.txt
EXPOSE $PORT
CMD python server.py $PORT