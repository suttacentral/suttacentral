FROM python:3.7
RUN apt-get update && apt-get install -y pngnq
RUN mkdir -p /opt/sc/sockets
RUN mkdir -p /opt/sc/sc-flask
WORKDIR /opt/sc/sc-flask
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY *.* ./


