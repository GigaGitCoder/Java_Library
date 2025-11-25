<div align="center">

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) ![Thymeleaf](https://img.shields.io/badge/Thymeleaf-%23364437.svg?style=for-the-badge&logo=thymeleaf&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)

[![License](https://img.shields.io/badge/license-GNU%20GPL%20v3.0-brightgreen)](LICENSE) ![Stars](https://img.shields.io/github/stars/GigaGitCoder/JavaLibrary)

JavaLibrary 是一个基于 Java Spring 的图书馆项目，具有完全自动化且经过充分测试的设置和部署流程。
</div>

# 安装

1) 从官方网站下载 [Java](https://www.java.com/en/download/?locale=en)。

2) 从官方网站下载 [Docker](https://www.docker.com/) 并按照说明进行设置：
- [下载 Mac 版 – Apple Silicon](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [下载 Mac 版 – Intel 芯片](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [下载 Windows 版 – AMD64](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [下载 Windows 版 – ARM64](https://desktop.docker.com/win/main/arm64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)
- [下载 Linux 版](https://docs.docker.com/desktop/linux/install/)

# Git 子模块及文档

- [JavaBookService](https://github.com/GigaGitCoder/JavaBookService)
- [JavaUserService](https://github.com/GigaGitCoder/JavaUserService)
- [JavaLibrarySite](https://github.com/GigaGitCoder/JavaLibrarySite)

# 快速开始

- Linux/macOS:

```bash
git clone --recurse-submodules https://github.com/GigaGitCoder/JavaLibrary

cd JavaLibrary

./setup-build.sh

./start.sh
```
使用 `./stop.sh/` 关闭。

- Windows:
```cmd
git clone --recurse-submodules https://github.com/GigaGitCoder/JavaLibrary

cd JavaLibrary

start setup-build.ps1

start start.ps1
```
使用 `start stop.ps1` 关闭。

- 启动项目后，您需要通过 POST 方法 'api/admin/registerAsAdmin/' 创建第一个管理员账户
```json
{
    "nickname": "nickname",
    "email": "email",
    "password": "password"
}
```

# 注意事项：

在实际项目中使用时，建议在启动/部署项目之前更改一些值：
- `./user-service/` 中的 jwt 密钥。
- `docker-compose.yml` 中 `user-service` 和 `book-service` 的 postgres 认证凭据。
- 您也可以根据需要在任何 `docker-compose.yml` 文件中更改端口。

项目运行期间只应保持网站端口（默认为 `8091`）开放。其余端口应拒绝用户访问。