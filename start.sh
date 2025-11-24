#!/bin/bash

# Создаем сеть, если её нет
docker network inspect library-network >/dev/null 2>&1 || \
    docker network create library-network

# Запускаем все сервисы
docker compose up -d
