package com.library.library.controller;

import com.library.library.DTO.BookRequestDTO;
import com.library.library.DTO.BookResponseDTO;
import com.library.library.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/books")
public class BookController {

    private final BookService bookService;

    @GetMapping("/getAll")
    public ResponseEntity<Page<BookResponseDTO>> getAllBooks(Pageable pageable) {
        Page<BookResponseDTO> books = bookService.getAllBooks(pageable);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<BookResponseDTO>> searchBooks(
            Pageable pageable,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) LocalDate minReleaseDate,
            @RequestParam(required = false) LocalDate maxReleaseDate
    ) {
        Page<BookResponseDTO> books = bookService.searchBooks(pageable, title, author, genre, minReleaseDate, maxReleaseDate);
        return ResponseEntity.ok(books);
    }

    @GetMapping("getById/{id}")
    public ResponseEntity<BookResponseDTO> getBookById(@PathVariable Long id) {
        BookResponseDTO book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @PostMapping("/create")
    public ResponseEntity<BookResponseDTO> createBook(@Valid @RequestBody BookRequestDTO bookRequestDTO) {
        BookResponseDTO savedBook = bookService.createBook(bookRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookResponseDTO> updateBook(
            @PathVariable Long id,
            @Valid @RequestBody BookRequestDTO updatedBookDTO
    ) {
        BookResponseDTO updatedBook = bookService.updateBook(id, updatedBookDTO);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
