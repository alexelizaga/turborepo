## Getting Started

First, run the development server:

```bash
yarn dev
```


## Google Cloud Container Registry

Authentication
```bash
gcloud components install docker-credential-gcr
docker-credential-gcr configure-docker
```

Push
```bash
docker build -t shop .
docker tag shop gcr.io/brocodeappsprod/shop
docker push gcr.io/brocodeappsprod/shop
```