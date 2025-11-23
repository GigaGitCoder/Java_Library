package com.library.library.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/proxy")
public class BookProxyController {

    private static final String API_BASE_URL = "http://book-service:8090/api/books";
    private final RestTemplate restTemplate = new RestTemplate();


    @GetMapping("/books")
    public ResponseEntity<String> getAllBooks() {
        try {
            String url = API_BASE_URL + "/getAll";
            System.out.println("GET all books: " + url);

            String result = restTemplate.getForObject(url, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(result);

        } catch (Exception e) {
            System.err.println("Ошибка GET all: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }


    @GetMapping("/books/{id}")
    public ResponseEntity<String> getBookById(@PathVariable Long id) {
        try {
            String url = API_BASE_URL + "/getById/" + id;
            System.out.println("GET book by ID: " + url);

            String result = restTemplate.getForObject(url, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(result);

        } catch (Exception e) {
            System.err.println("Ошибка GET by ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Книга не найдена\"}");
        }
    }


    @PostMapping("/books")
    public ResponseEntity<String> createBook(@RequestBody String bookJson) {
        try {
            String url = API_BASE_URL + "/create";
            System.out.println("POST create book: " + url);
            System.out.println("Body: " + bookJson);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>(bookJson, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка POST: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Ошибка создания книги: " + e.getMessage() + "\"}");
        }
    }


    @PutMapping("/books/{id}")
    public ResponseEntity<String> updateBook(@PathVariable Long id, @RequestBody String bookJson) {
        try {
            String url = API_BASE_URL + "/update/" + id;
            System.out.println("PUT update book: " + url);
            System.out.println("Body: " + bookJson);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>(bookJson, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.PUT,
                    request,
                    String.class
            );

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка PUT: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Ошибка обновления книги: " + e.getMessage() + "\"}");
        }
    }


    @DeleteMapping("/books/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        try {
            String url = API_BASE_URL + "/delete/" + id;
            System.out.println("DELETE book: " + url);

            restTemplate.delete(url);

            return ResponseEntity.ok()
                    .body("{\"message\": \"Книга успешно удалена\"}");

        } catch (Exception e) {
            System.err.println("Ошибка DELETE: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Ошибка удаления книги: " + e.getMessage() + "\"}");
        }
    }


    @GetMapping("/books/search")
    public ResponseEntity<String> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String minReleaseDate,
            @RequestParam(required = false) String maxReleaseDate) {

        try {
            StringBuilder urlBuilder = new StringBuilder(API_BASE_URL + "/search?");

            if (title != null && !title.isEmpty()) {
                urlBuilder.append("title=").append(title).append("&");
            }
            if (author != null && !author.isEmpty()) {
                urlBuilder.append("author=").append(author).append("&");
            }
            if (genre != null && !genre.isEmpty()) {
                urlBuilder.append("genre=").append(genre).append("&");
            }
            if (minReleaseDate != null && !minReleaseDate.isEmpty()) {
                urlBuilder.append("minReleaseDate=").append(minReleaseDate).append("&");
            }
            if (maxReleaseDate != null && !maxReleaseDate.isEmpty()) {
                urlBuilder.append("maxReleaseDate=").append(maxReleaseDate).append("&");
            }

            String url = urlBuilder.toString();
            if (url.endsWith("&")) {
                url = url.substring(0, url.length() - 1);
            }

            System.out.println("GET search: " + url);

            String result = restTemplate.getForObject(url, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(result);

        } catch (Exception e) {
            System.err.println("Ошибка SEARCH: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Ошибка поиска: " + e.getMessage() + "\"}");
        }
    }
}
