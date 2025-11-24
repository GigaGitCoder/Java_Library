#!/bin/bash
set -e

# Функция для вывода сообщений
echo_info() {
  echo -e "\033[1;34m$1\033[0m"
}

# Проверка и установка Maven
if ! command -v mvn &> /dev/null
then
    echo_info "Maven not found, installing..."
    sudo apt update
    sudo apt install -y maven
else
    echo_info "Maven is already installed."
fi

# Показываем версию Maven
mvn -v

# Функция для сборки Maven-проекта в указанной папке
build_maven_project() {
    local path=$1
    echo_info "Starting 'mvn clean package' in directory $path..."
    pushd "$path" > /dev/null
    mvn clean package
    popd > /dev/null
}

# Запускаем билд для каждого модуля
build_maven_project "book-service"
build_maven_project "site"
build_maven_project "user-service"

echo_info "Setup build is over"
