#!/bin/bash
#docker run --rm -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=awesome -e POSTGRES_DB=iss-db -p 5432:5432 -it postgres
docker run --rm -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=awesome -e POSTGRES_DB=iss-db -p 5432:5432 -v pgdata:/var/lib/postgresql/data -d postgres
