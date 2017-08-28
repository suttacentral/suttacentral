prepare-host:
	@echo "Since ElasticSearch 5.0 you have to change 'vm.max_map_count' to at least 262144 on the host machine, even when using Docker."
	@echo "In order to do that I'm going to ask you for your sudo password"
	sudo sysctl -w vm.max_map_count=262144
	sudo bash -c 'echo "vm.max_map_count=262144" >> /etc/sysctl.conf'

build-all:
	@make build-flask
	@make build-arangodb
	@make build-nginx
	@make build-elasticsearch
rebuild-all: clean-all build-all

build-flask:
	@docker-compose build sc-flask
build-arangodb:
	@docker-compose build sc-arangodb
build-nginx:
	@docker-compose build sc-nginx
build-elasticsearch:
	@docker-compose build sc-elasticsearch

run-dev:
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

run-dev-no-logs:
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Containers and images ids
CONTS-ARANGO=$(shell docker ps -a -q -f "name=sc-arangodb")
CONTS-FLASK=$(shell docker ps -a -q -f "name=sc-flask")
CONTS-NGINX=$(shell docker ps -a -q -f "name=sc-nginx")
CONTS-ELASTICSEARCH=$(shell docker ps -a -q -f "name=sc-elasticsearch")

#stop docker containers
stop-arangodb:
	-@docker stop $(CONTS-ARANGO)
stop-flask:
	-@docker stop $(CONTS-FLASK)
stop-nginx:
	-@docker stop $(CONTS-NGINX)
stop-elasticsearch:
	-@docker stop $(CONTS-ELASTICSEARCH)
stop:
	@docker-compose stop

#remove docker containers
rm-arangodb:
	-@docker rm $(CONTS-ARANGO)
rm-flask:
	-@docker rm $(CONTS-FLASK)
rm-nginx:
	-@docker rm $(CONTS-NGINX)
rm-elasticsearch:
	-@docker rm $(CONTS-ELASTICSEARCH)
rm: rm-arangodb rm-flask rm-nginx rm-elasticsearch

# Remove volumes
rm-db-volume:
	-@docker volume rm nextsc_db-data-volume
rm-elasticsearch-volume:
	-@docker volume rm nextsc_elasticsearch-data
rm-nginx-volume:
	-@dokcer volume rm nextsc_nginx-data-volume
rm-socket-volume:
	-@docker volume rm nextsc_socket-volume
rm-all-volumes: rm-db-volume rm-elasticsearch-volume rm-nginx-volume rm-socket-volume


#clean docker containers
clean-arangodb: stop-arangodb rm-arangodb
clean-flask: stop-flask rm-flask
clean-nginx: stop-nginx rm-nginx
clean-elasticsearch: stop-elasticsearch rm-elasticsearch
clean-all: clean-arangodb clean-flask clean-nginx clean-elasticsearch rm-all-volumes

#Open shell in container
shell-arangodb:
	@docker exec -it sc-arangodb bash
shell-flask:
	@docker exec -it sc-flask bash
shell-nginx:
	@docker exec -it sc-nginx bash
shell-elasticsearch:
	@docker exec -it sc-elasticsearch bash

#Logs
logs:
	@docker-compose logs
logs-flask:
	@docker logs -f sc-flask
logs-arangodb:
	@docker logs -f sc-arangodb
logs-nginx:
	@docker logs -f sc-nginx
logs-elasticsearch:
	@docker logs -f sc-elasticsearch

# reloads
# Only in dev mode local changes will be used after the reload
reload-nginx:
	@docker exec sc-nginx nginx -s reload
reload-uwsgi:
	@docker exec sc-flask uwsgi --reload /tmp/uwsgi.pid

# Tests.
test:
	@docker exec sc-flask pytest server/
