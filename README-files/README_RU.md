<div align="center">

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) ![Thymeleaf](https://img.shields.io/badge/Thymeleaf-%23364437.svg?style=for-the-badge&logo=thymeleaf&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)

[![License](https://img.shields.io/badge/license-GNU%20GPL%20v3.0-brightgreen)](LICENSE) ![Stars](https://img.shields.io/github/stars/GigaGitCoder/JavaLibrary)

JavaLibrary — это проект библиотеки на основе Java Spring с полностью автоматизированным и хорошо протестированным процессом установки и развертывания.
</div>

# Установка

1) Скачайте [Java](https://www.java.com/en/download/?locale=en) с официального сайта.

2) Скачайте [Docker](https://www.docker.com/) с официального сайта и следуйте инструкциям по установке:
- [Скачать для Mac – Apple Silicon](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Скачать для Mac – Intel Chip](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Скачать для Windows – AMD64](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Скачать для Windows – ARM64](https://desktop.docker.com/win/main/arm64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Скачать для Linux](https://docs.docker.com/desktop/linux/install/)

# Подмодули Git с документацией

- [JavaBookService](https://github.com/GigaGitCoder/JavaBookService)
- [JavaUserService](https://github.com/GigaGitCoder/JavaUserService)
- [JavaLibrarySite](https://github.com/GigaGitCoder/JavaLibrarySite)

# Быстрый старт

- Linux/macOS:

```bash
git clone --recurse-submodules https://github.com/GigaGitCoder/JavaLibrary

cd JavaLibrary

./setup-build.sh

./start.sh
```
`./stop.sh/` для остановки.

- Windows:
```cmd
git clone --recurse-submodules https://github.com/GigaGitCoder/JavaLibrary

cd JavaLibrary

start setup-build.ps1

start start.ps1
```
`start stop.ps1` для остановки.

- После запуска проекта вы должны создать первого администратора через POST-запрос 'api/admin/registerAsAdmin/'
```json
{
    "nickname": "nickname",
    "email": "email",
    "password": "password"
}
```

# Примечания:

При использовании в реальных проектах стоит изменить некоторые значения перед запуском/развертыванием проекта:
- секретный ключ jwt в `./user-service/`.
- учетные данные postgres в `docker-compose.yml` для `user-service` и `book-service`.
- также вы можете изменить порты по своему усмотрению в любом из файлов `docker-compose.yml`.

Только порт сайта (`8091` по умолчанию) должен оставаться открытым во время работы проекта. Остальные порты должны быть закрыты для пользователей.