<div align="center">
  
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) ![Thymeleaf](https://img.shields.io/badge/Thymeleaf-%23364437.svg?style=for-the-badge&logo=thymeleaf&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)

[![License](https://img.shields.io/badge/license-GNU%20GPL%20v3.0-brightgreen)](LICENSE) ![Stars](https://img.shields.io/github/stars/GigaGitCoder/JavaLibrary)

JavaLibrary is a Java Spring-based library project featuring a fully automated and well-tested setup and deployment process.
</div>

# Setup 

1) Download [Java](https://www.java.com/en/download/?locale=en) from official website.

2) Download [Docker](https://www.docker.com/) from official website and follow the instructions to set it up:
- [Download for Mac – Apple Silicon](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Download for Mac – Intel Chip](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Download for Windows – AMD64](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Download for Windows – ARM64](https://desktop.docker.com/win/main/arm64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [Download for Linux](https://docs.docker.com/desktop/linux/install/)

# Gitmodules with Documentations

- [JavaBookService](https://github.com/GigaGitCoder/JavaBookService)
- [JavaUserService](https://github.com/GigaGitCoder/JavaUserService)
- [JavaLibrarySite](https://github.com/GigaGitCoder/JavaLibrarySite)

# Quick Start

- Linux/macOS:

```bash
git clone --recurse-submodules https://github.com/GigaGitCoder/JavaLibrary

cd JavaLibrary

./setup-build.sh

./start.sh
```
`./stop.sh/` for shutdown.
  
- Windows:
```cmd
git clone --recurse-submodules https://github.com/GigaGitCoder/JavaLibrary

cd JavaLibrary

start setup-build.ps1

start start.ps1
```
`start stop.ps1` for shutdown.

- After starting a project you should make your first admin by POST-request 'api/admin/registerAsAdmin/'
```json
{
    "nickname": "nickname",
    "email": "email",
    "password": "password"
}
```

# Notes:

When used in real projects, it is worth changing some values before launching/deploying the project:
- jwt secret key in `./user-service/`.
- postgres auth credentials in `docker-compose.yml` for `user-service` and `book-service`.
- also you can change ports for your needs in any of `docker-compose.yml` files.

Only the site's port (`8091` default) should remain open during the project. The remaining ports should be refused to users.

# Localizations

- [Русский](./README-files/README_RU.md)
- [中文](./README-files/README_ZH.md)