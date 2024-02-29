#!/bin/bash
docker exec -it $(docker ps | grep postgres | cut -d' ' -f1) psql -U awesome -d iss-db -c "SELECT * FROM iss_locate;"
