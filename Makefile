.DEFAULT_GOAL := build

PORT ?= 8081
KOOSE_URL ?= "http://host.docker.internal:8082"
LOG ?= true

build-local:
	yarn build

serve-local:
	@KOOSE_URL=$(KOOSE_URL) PORT=$(PORT) ROARR_LOG=$(LOG) yarn --silent serve 

start-local: build-local start-local

build:
	docker build -t k8s-noose .

start:
	docker run -d \
	-p $(PORT):$(PORT) \
	--name=k8s-noose \
	-e KOOSE_URL=$(KOOSE_URL) \
	-e PORT=${PORT} \
	-e ROARR_LOG=$(LOG) \
	k8s-noose

stop:
	docker stop k8s-noose

remove:
	docker rm k8s-noose

logs:
	@docker logs -f k8s-noose

cluster-up:
	docker-compose up -d

cluster-down:
	docker-compose down

cluster-start:
	docker-compose start

cluster-stop:
	docker-compose stop

cluster-logs:
	docker-compose logs -f noose koose goose

cluster-logs-noose:
	@docker-compose logs -f noose

cluster-logs-koose:
	@docker-compose logs -f koose

cluster-logs-goose:
	@docker-compose logs -f goose