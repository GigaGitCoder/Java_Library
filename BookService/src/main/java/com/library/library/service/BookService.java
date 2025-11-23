package com.library.library.service;

import com.library.library.DTO.BookRequestDTO;
import com.library.library.DTO.BookResponseDTO;
import com.library.library.entity.Book;
import com.library.library.exception.BookNotFoundException;
import com.library.library.mapper.BookMapper;
import com.library.library.repository.BookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public Page<BookResponseDTO> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable).map(bookMapper::toDto);
    }

    public BookResponseDTO getBookById(Long id) {
        return bookRepository.findById(id)
                .map(bookMapper::toDto)
                .orElseThrow(() -> new BookNotFoundException("Book was not found by id: " + id));
    }

    public Page<BookResponseDTO> searchBooks(Pageable pageable, String title, String author, String genre,
                                                 LocalDate minReleaseDate, LocalDate maxReleaseDate) {

        List<Specification<Book>> specs = new ArrayList<>();
        if (title != null && !title.isBlank()) {
            specs.add(BookSpecification.titleFilter(title));
        }
        if (author != null && !author.isBlank()) {
            specs.add(BookSpecification.authorFilter(author));
        }
        if (genre != null) {
            specs.add(BookSpecification.genreFilter(genre));
        }
        if (minReleaseDate != null) {
            specs.add(BookSpecification.minReleaseDate(minReleaseDate));
        }
        if (maxReleaseDate != null) {
            specs.add(BookSpecification.maxReleaseDate(maxReleaseDate));
        }
        Specification<Book> finalSpec = null;
        for (Specification<Book> spec : specs) {
            if (finalSpec == null) {
                finalSpec = spec;
            } else {
                finalSpec = finalSpec.and(spec);
            }
        }
        return bookRepository.findAll(finalSpec, pageable).map(bookMapper::toDto);
    }


    public BookResponseDTO createBook(BookRequestDTO bookRequestDTO) {
        Book book = bookMapper.toEntity(bookRequestDTO);
        book = bookRepository.save(book);
        return bookMapper.toDto(book);
    }

    @Transactional
    public BookResponseDTO updateBook(Long id, BookRequestDTO updatedBookDTO) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid book id" + id);
        }
        if (updatedBookDTO == null) {
            throw new IllegalArgumentException("Invalid book data");
        }
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("No book found with id " + id));

        book.setAuthor(updatedBookDTO.getAuthor());
        book.setDate(updatedBookDTO.getDate());
        book.setTitle(updatedBookDTO.getTitle());
        book.setDescription(updatedBookDTO.getDescription());
        book.setGenre(updatedBookDTO.getGenre());

        Book savedBook = bookRepository.save(book);
        return bookMapper.toDto(savedBook);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("No book found with id " + id);
        }
        bookRepository.deleteById(id);
    }
}
