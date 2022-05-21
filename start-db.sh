#!/bin/bash
set -e

echo "Starting development PostgreSQL DB"
docker compose down
docker compose up -d