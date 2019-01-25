COMPOSE     := docker-compose -f docker-compose.yml
COMPOSEDEV  := $(COMPOSE) -f docker-compose.dev.yml
COMPOSETEST := $(COMPOSE) -f docker-compose.test.yml
COMPOSEPROD := $(COMPOSE) -f docker-compose.prod.yml

prepare-host:
	@echo "Since ElasticSearch 5.0 you have to change 'vm.max_map_count' to at least 262144 on the host machine, even when using Docker."
	@echo "In order to do that I'm going to ask you for your sudo password"
	sudo sysctl -w vm.max_map_count=262144
	sudo bash -c 'echo "vm.max_map_count=262144" >> /etc/sysctl.conf'
	@echo "\033[1;32mSuccess!"

create-network:
	-@docker network create nginx-proxy

generate-cert:
	@cd nginx && ./create-certs.sh



SERVICES := sc-flask sc-nginx sc-swagger sc-arangodb sc-frontend sc-elasticsearch

run-dev:
	@$(COMPOSEDEV) up $(SERVICES)

run-dev-no-logs:
	@$(COMPOSEDEV) up -d $(SERVICES)

run-dev-rebuild:
	@$(COMPOSEDEV) up --build -d $(SERVICES)

run-prod:
	@$(COMPOSEPROD) up $(SERVICES)

run-prod-no-logs:
	@$(COMPOSEPROD) up -d $(SERVICES)

migrate:
	@docker exec -t sc-flask python server/manage.py migrate


clean-all:
	$(COMPOSE) down --rmi local --volumes


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
	@make create-network
	-@docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
	@echo "waiting for all services to fully start"
	@bash wait_for_flask.sh
# Run tests
test:
	@make test-server

test-server:
	@docker exec -t sc-flask pytest server/

test-api:
	docker-compose run --entrypoint "python /opt/sc/api-tester/run-tests.py" sc-api-tester

load-data:
	@docker exec -t sc-flask bash -c "cd server && python manage.py load_data"

load-data-no-pull:
	@docker exec -t sc-flask bash -c "cd server && python manage.py load_data --no_pull"

delete-database:
	@docker exec -t sc-flask bash -c "cd server && python manage.py delete_db"

index-elasticsearch:
	@docker exec -t sc-flask bash -c "cd server && python manage.py index_elasticsearch"

run-preview-env:
	@make clean-all
	@make create-network
	@make generate-cert
	@make run-dev-no-logs
	@bash wait_for_flask.sh
	@make load-data
	@make index-elasticsearch
	@echo "\033[1;32mDONE!"

run-preview-env-no-search:
	@make clean-all
	@make create-network
	@make generate-cert
	@make run-dev-no-logs
	@bash wait_for_flask.sh
	@make load-data
	@echo "\033[1;32mDONE!"

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
	@docker run -it --rm --name env_variable_setup -v $(shell pwd):/opt/ -w /opt python:3.7 python env_variables_setup.py

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
