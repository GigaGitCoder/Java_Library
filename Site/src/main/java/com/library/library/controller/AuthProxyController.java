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
@RequestMapping("/proxy/auth")
@CrossOrigin(origins = "*")
public class AuthProxyController {

    private static final String AUTH_API_URL = "http://user-service:8092/api/auth";
    private static final String ADMIN_API_URL = "http://user-service:8092/api/admin";

    // И в методах:
    String url = ADMIN_API_URL + "/getAll";
    private final RestTemplate restTemplate = new RestTemplate();



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String loginJson) {
        try {
            String url = AUTH_API_URL + "/login";
            System.out.println("POST login: " + url);
            System.out.println("Body: " + loginJson);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(loginJson, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);



            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (org.springframework.web.client.HttpClientErrorException e) {
            System.err.println("❌ Ошибка LOGIN: " + e.getStatusCode() + " : " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode())
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("❌ Ошибка LOGIN: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Ошибка входа: " + e.getMessage() + "\"}");
        }
    }



    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody String registerJson) {
        try {
            String url = AUTH_API_URL + "/register";
            System.out.println("POST register: " + url);
            System.out.println("Body: " + registerJson);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(registerJson, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка REGISTER: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            String url = AUTH_API_URL + "/logout";
            System.out.println("POST logout: " + url);

            HttpHeaders headers = new HttpHeaders();
            if (authHeader != null) {
                headers.set("Authorization", authHeader);
            }

            HttpEntity<String> request = new HttpEntity<>(headers);
            restTemplate.postForEntity(url, request, String.class);

            return ResponseEntity.ok()
                    .body("{\"message\": \"Успешный выход\"}");

        } catch (Exception e) {
            System.err.println("Ошибка LOGOUT: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Ошибка выхода\"}");
        }
    }

    // Методы админов

    @GetMapping("/admin/users")
    public ResponseEntity<String> getAllUsersAdmin(@RequestHeader("Authorization") String authHeader) {
        try {
            String url = ADMIN_API_URL + "/getAll";
            System.out.println("GET admin all users: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка GET admin users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/admin/users/{id}")
    public ResponseEntity<String> getUserByIdAdmin(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String url = ADMIN_API_URL + "/getById/" + id;
            System.out.println("GET admin user by ID: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка GET admin user by ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Пользователь не найден\"}");
        }
    }

    @GetMapping("/admin/users/email/{email}")
    public ResponseEntity<String> getUserByEmailAdmin(
            @PathVariable String email,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String url = ADMIN_API_URL + "/getByEmail/" + email;
            System.out.println("GET admin user by email: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка GET admin user by email: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Пользователь не найден\"}");
        }
    }

    @GetMapping("/admin/users/name/{name}")
    public ResponseEntity<String> getUserByNameAdmin(
            @PathVariable String name,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String url = ADMIN_API_URL + "/getByName/" + name;
            System.out.println("GET admin user by name: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка GET admin user by name: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Пользователь не найден\"}");
        }
    }

    @GetMapping("/admin/users/search")
    public ResponseEntity<String> searchUsersAdmin(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String role,
            @RequestHeader("Authorization") String authHeader) {

        try {
            StringBuilder urlBuilder = new StringBuilder(ADMIN_API_URL + "/search?");

            if (name != null && !name.isEmpty()) {
                urlBuilder.append("name=").append(name).append("&");
            }
            if (email != null && !email.isEmpty()) {
                urlBuilder.append("email=").append(email).append("&");
            }
            if (role != null && !role.isEmpty()) {
                urlBuilder.append("role=").append(role).append("&");
            }

            String url = urlBuilder.toString();
            if (url.endsWith("&")) {
                url = url.substring(0, url.length() - 1);
            }

            System.out.println("GET admin search users: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка SEARCH admin users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/admin/users/registerAsAdmin")
    public ResponseEntity<String> registerAsAdmin(
            @RequestBody String userJson,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String url = ADMIN_API_URL + "/registerAsAdmin";
            System.out.println("POST register as admin: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(userJson, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка POST register as admin: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/admin/users/{id}")
    public ResponseEntity<String> updateUserAdmin(
            @PathVariable Long id,
            @RequestBody String userJson,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String url = ADMIN_API_URL + "/update/" + id;
            System.out.println("PUT admin update user: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(userJson, headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);

            return ResponseEntity.ok()
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .body(response.getBody());

        } catch (Exception e) {
            System.err.println("Ошибка PUT admin update user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Ошибка обновления пользователя\"}");
        }
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<String> deleteUserAdmin(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String url = ADMIN_API_URL + "/delete/" + id;
            System.out.println("DELETE admin user: " + url);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);

            HttpEntity<String> request = new HttpEntity<>(headers);

            restTemplate.exchange(url, HttpMethod.DELETE, request, String.class);

            return ResponseEntity.ok()
                    .body("{\"message\": \"Пользователь успешно удалён\"}");

        } catch (Exception e) {
            System.err.println("Ошибка DELETE admin user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Ошибка удаления пользователя\"}");
        }
    }


}
