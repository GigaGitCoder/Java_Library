JavaSite это реализация сайта-библиотеки книг с настроенной коммуникацией с сервисами юзеров и книг.

Сервисы:
- [JavaLibrary](https://github.com/GigaGitCoder/Java_Library/BookService)
- [JavaUsers](https://github.com/GigaGitCoder/Java_Library/UserService)

# Особенности:

- При первом запуске сервисов и сайта, первого админа следует создать через POST запрос `ip-user-service:8092/api/admin/registerAsAdmin/` с соответствующим body контентом.
- Запросы из .js файлов проксируются Controller файлами и перенаправляются на ip контейнеров. По надобности стоит поменять ссылки для запросов в Controller файлах.
- Ошибки пока не имеют четких пояснений ясных для любого пользователя.
