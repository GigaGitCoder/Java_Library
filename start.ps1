# Проверяем, существует ли сеть, если нет — создаём
if (-not (docker network ls --format '{{.Name}}' | Select-String "^library-network$")) {
    Write-Host "Creating library-network..."
    docker network create library-network
} else {
    Write-Host "library-network is already exist."
}

# Запускаем все сервисы
docker compose up -d
