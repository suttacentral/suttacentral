FROM python:3.7
RUN mkdir -p /opt/sc/po_files
WORKDIR /opt/sc/po_files

COPY requirements.txt .
RUN pip3 install -r requirements.txt
CMD tail -f /dev/null
