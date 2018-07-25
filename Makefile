prepare-host:
	@echo "Since ElasticSearch 5.0 you have to change 'vm.max_map_count' to at least 262144 on the host machine, even when using Docker."
	@echo "In order to do that I'm going to ask you for your sudo password"
	sudo sysctl -w vm.max_map_count=262144
	sudo bash -c 'echo "vm.max_map_count=262144" >> /etc/sysctl.conf'
	@echo "\033[1;32mSuccess!"

create-network:
	@docker network create nginx-proxy

build-all:
	@make create-network || true
	@make build-flask
	@make build-arangodb
	@make build-nginx
	@make build-elasticsearch
	@make build-swagger
	@make build-frontend-tester
build-flask:
	@docker-compose build sc-flask
build-arangodb:
	@docker-compose build sc-arangodb
build-nginx:
	@docker-compose build sc-nginx
	cd nginx && ./create-certs.sh
build-elasticsearch:
	@docker-compose build sc-elasticsearch
build-swagger:
	@docker-compose build sc-swagger
build-frontend-tester:
	@docker-compose build sc-frontend-tester
build-pootle-pipeline:
	@docker-compose build sc-pootle-pipeline

rebuild-all: clean-all build-all
rebuild-flask: clean-flask build-flask
rebuild-arangodb: clean-arangodb build-arangodb
rebuild-nginx: clean-nginx build-nginx
rebuild-elasticsearch: clean-elasticsearch build-elasticsearch
rebuild-swagger: clean-swagger build-swagger


run-dev:
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

run-dev-no-logs:
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

run-prod:
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

run-prod-no-logs:
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

run-frontend-builder:
	@docker-compose run --entrypoint "bash builder.sh" sc-frontend-builder

migrate:
	@docker exec -t sc-flask python server/manage.py migrate

# Containers and images ids
CONTS-ARANGO=$(shell docker ps -a -q -f "name=sc-arangodb")
CONTS-FLASK=$(shell docker ps -a -q -f "name=sc-flask")
CONTS-NGINX=$(shell docker ps -a -q -f "name=sc-nginx")
CONTS-ELASTICSEARCH=$(shell docker ps -a -q -f "name=sc-elasticsearch")
CONTS-SWAGGER=$(shell docker ps -a -q -f "name=sc-swagger")
CONTS-FRONTEND_TESTER=$(shell docker ps -a -q -f "name=sc-frontend-tester")
CONTS-POOTLE=$(shell docker ps -a -q -f "name=sc-pootle")

#stop docker containers
stop-arangodb:
	-@docker stop $(CONTS-ARANGO)
stop-flask:
	-@docker stop $(CONTS-FLASK)
stop-nginx:
	-@docker stop $(CONTS-NGINX)
stop-elasticsearch:
	-@docker stop $(CONTS-ELASTICSEARCH)
stop-swagger:
	-@docker stop $(CONTS-SWAGGER)
stop-frontend-tester:
	-@docker stop $(CONTS-FRONTEND_TESTER)
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
rm-swagger:
	-@docker rm $(CONTS-SWAGGER)
rm-frontend-tester:
	-@docker rm $(CONTS-FRONTEND_TESTER)
rm-pootle:
	-@docker rm $(CONTS-POOTLE)
rm: rm-arangodb rm-flask rm-nginx rm-elasticsearch rm-frontend-tester

# Remove volumes
rm-db-volume:
	-@docker volume rm nextsc_db-data-volume
rm-elasticsearch-volume:
	-@docker volume rm nextsc_elasticsearch-data
rm-nginx-volume:
	-@docker volume rm nextsc_nginx-data-volume
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
shell-swagger:
	@docker exec -it sc-swagger
shell-frontend-tester:
	@docker exec -it sc-frontend-tester bash
shell-pootle:
	@docker exec -it sc-pootle bash

#Logs
logs:
	@docker-compose logs -f
logs-flask:
	@docker logs -f sc-flask
logs-arangodb:
	@docker logs -f sc-arangodb
logs-nginx:
	@docker logs -f sc-nginx
logs-elasticsearch:
	@docker logs -f sc-elasticsearch
logs-swagger:
	@docker logs -f sc-swagger
logs-frontend-tester:
	@docker logs -f sc-frontend-tester

# reloads
# Only in dev mode local changes will be used after the reload
reload-nginx:
	@docker exec sc-nginx nginx -s reload
reload-uwsgi:
	@docker exec sc-flask uwsgi --reload /tmp/uwsgi.pid
install-requirements:
	@docker exec sc-flask pip install -r requirements.txt
	@make reload-uwsgi

# Tests.
# Starts containers so that we are ready to run tests in them.
prepare-tests:
	-@docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
	@echo "waiting for all services to fully start"
	@bash wait_for_flask.sh
# Run tests
test:
	@make test-client
	@make test-server
	@make test-builds

test-client:
	@docker exec -t sc-frontend-tester bash -c "echo 'Running client linter' && polymer lint && wct"

test-server:
	@docker exec -t sc-flask pytest server/

test-builds:
	test -e client/build/default/index.html
	test -e client/build/es5-bundled/index.html

load-data:
	@docker exec -t sc-flask bash -c "cd server && python manage.py load_data"

load-data-no-pull:
	@docker exec -t sc-flask bash -c "cd server && python manage.py load_data --no_pull"

delete-database:
	@docker exec -t sc-flask bash -c "cd server && python manage.py delete_db"

index-elasticsearch:
	@docker exec -t sc-flask bash -c "cd server && python manage.py index_elasticsearch"

run-preview-env:
	@make rebuild-all
	@make run-dev-no-logs
	@bash wait_for_flask.sh
	@make load-data
	@make index-elasticsearch
	@echo "\033[1;32mDONE!"
	@make run-dev

run-preview-env-no-search:
	@make rebuild-all
	@make run-dev-no-logs
	@bash wait_for_flask.sh
	@make load-data
	@echo "\033[1;32mDONE!"
	@make run-dev

run-production-env:
	@make generate-env-variables
	@make rebuild-all
	@make run-prod-no-logs
	@bash wait_for_flask.sh
	@make load-data
	@make index-elasticsearch
	@echo "\033[1;32mDONE!"
	@make run-prod

generate-env-variables:
	@docker run -it --rm --name env_variable_setup -v $(shell pwd):/opt/ -w /opt python:3.6.2 python env_variables_setup.py

generate-server-po-files:
	@docker exec -t sc-flask bash -c "cd server && python manage.py generate_po_files"

load-server-po-files:
	@docker exec -t sc-flask bash -c "cd server && python manage.py load_po_files"

load-to-pootle:
	@make generate-server-po-files
	@docker exec -t sc-pootle-pipeline python to_pootle.py
	#@docker exec -t sc-pootle bash -c "python3 create_and_update_projects.py"

load-from-pootle:
	@docker exec -t sc-pootle bash -c "python3 update_po_files.py"
	@docker exec -t sc-flask bash -c "cd server && python manage.py load_po_files -p /srv/pootle/po"
	@docker exec -t sc-pootle-pipeline python from_pootle.py

backup-mysql:
	@docker exec -t sc-pootle "/home/pootle/backup_mysql.sh"

restore-mysql:
	@docker exec -t sc-pootle "/home/pootle/restore_mysql.sh" < /dev/stdin
