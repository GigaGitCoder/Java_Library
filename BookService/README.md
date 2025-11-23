JavaLibrary это сервис для взаимодействия с логикой книг (библиотеки) в проектах где они есть.

# Ports

- 8090 - books service
- 5432 - books db

<br>

# Books endpoits

## API methods

link -> http://localhost:8090/api/books/

1) GET getAll 

2) GET getById/{id} 

3) GET search?params=values
```
params

title - схожести в названии
author - схожести в авторе
genre - схожести в жанре
minReleaseDate - от какой даты
maxReleaseDate - до какой даты
```
4) POST create -> body
```
body

{
    "fileLink": "link",
    "author": "author",
    "date": date #2025-12-30,
    "title": "title",
    "description": "description",
    "genre": "genre"
}
```

5) PUT update/{id} -> body
```
body

{
    "fileLink": "link",
    "author": "author",
    "date": date #2025-12-30,
    "title": "title",
    "description": "description",
    "genre": "genre"
}
```

6) DELETE delete/{id} 
