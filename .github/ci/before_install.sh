sudo apt-get update

# Update Docker to the newest version
sudo apt-get -y -o Dpkg::Options::="--force-confnew" install docker-ce

# Download the docker-compose specified in DOCKER_COMPOSE_VERSION env variable.
sudo rm /usr/local/bin/docker-compose
curl -L https://github.com/docker/compose/releases/download/1.15.0/docker-compose-`uname -s`-`uname -m` > docker-compose
chmod +x docker-compose
sudo mv docker-compose /usr/local/bin

# Build and start your containers.
make prepare-tests

# You will want this for logging. If one of your containers does not build for
# whatever reason it's best to report that now before your tests start
# otherwise it can be really tricky to debug why tests are failing sometimes.
docker wait sc-frontend
docker-compose logs
docker ps