# Noose
A minimal nodejs service for k8s workshop

## Build
### Run on local machine
- both build and start: `yarn start` or `make start-local`
- build: `yarn build` or `make build-local`
- run from dist folder: `yarn serve` or `make serve-local`

### Run in docker standalone
- build `make build`
- start `make start`
- stop `make stop`
- teardown `make remove`
- tail logs `make logs`

### Run full cluster in docker-compose
- start new cluster `make cluster-up`. This starts both koose and goose.
- stop running cluster `make cluster-stop`. This does not delete the containers, just stop them.
- start stopped cluster `make cluster-start`. This starts the existing stopped cluster.
- teardown cluster `make cluster-down`. This stops and delete the cluster.
- cluster logs: `make cluster-logs`
- cluster specific service logs: `make cluster-logs-<service-name>`

## ENV Variables
- `PORT`: Port on which http server should listen. Default: `8081`
- `KOOSE_URL`: Url for the `koose service`
- `ROARR_LOG`: Set to `true` to enable logs