FROM docker.elastic.co/elasticsearch/elasticsearch:5.5.2
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-stempel
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin remove x-pack

