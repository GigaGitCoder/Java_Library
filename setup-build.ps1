# Проверяем, установлен ли Chocolatey
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Write-Host "Chocolatey is already instlled."
}

# Обновляем PATH в текущей сессии
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Проверяем, установлен ли Maven
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Maven by Chocolatey..."
    choco install maven -y
} else {
    Write-Host "Maven is already installed."
}

# Снова обновляем PATH, чтобы mvn стал доступен
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Показываем версию Maven
mvn -v

# Функция для сборки проекта Maven в указанной папке
function Build-MavenProject($path) {
    Write-Host "Starting 'mvn clean package' in directory $path..."
    Push-Location $path
    mvn clean package
    Pop-Location
}

# Запускаем сборку в каждой папке
Build-MavenProject "book-service"
Build-MavenProject "site"
Build-MavenProject "user-service"

Write-Host "Setup build is over"
