FROM webdevops/bootstrap:ubuntu-16.04

RUN chmod -R 2777 /tmp
# Install apt packages
RUN apt-get update
RUN /usr/local/bin/apt-install build-essential \
  swig \
  git \
  xmlstarlet \
  xsltproc \
  zip \
  cron \  
  unzip \
  mysql-client \
  openssh-client \
  python-dev \
  libxml2-dev \
  libssl-dev \
  libxslt1-dev \
  zlib1g-dev \
  libmysqlclient-dev \
  python-pip \
  python-xapian \
  xapian-tools \
  curl \
  sudo \
  python-setuptools \
  vim \
  supervisor

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# Install python packages
RUN pip install -q virtualenv \
    MySQL-python \
    flup \
    elasticsearch \
    python-memcached \
    python-Levenshtein \
    m2crypto \
    mailgun \
    django-mailgun \
    wheel


#Upgrade pip
RUN pip install --upgrade pip

# Install pootle
RUN pip install --process-dependency-links git+https://github.com/suttacentral/pootle.git

# Configure pootle
RUN mkdir /root/.pootle && ln -s /home/pootle/pootle.conf /root/.pootle/pootle.conf && mkdir -p /srv/pootle/po/.tmp


WORKDIR /home/pootle

RUN echo "59 * * * * /home/pootle/clear_cache.sh" | crontab

COPY pootle.sh /pootle.sh
RUN chmod a+x /pootle.sh
CMD ["/pootle.sh"]
