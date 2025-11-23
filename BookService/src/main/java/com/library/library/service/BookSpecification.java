package com.library.library.service;

import com.library.library.entity.Book;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public final class BookSpecification {

    private BookSpecification() {}

    public static Specification<Book> titleFilter(final String title) {
        return (root, query, cb) -> {
            if (title == null || title.isBlank()) return null;
            return cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase().trim() + "%");
        };
    }

    public static Specification<Book> authorFilter(final String author) {
        return (root, query, cb) -> {
            if (author == null || author.isBlank()) return null;
            return cb.like(cb.lower(root.get("author")), "%" + author.toLowerCase().trim() + "%");
        };
    }

    public static Specification<Book> genreFilter(final String genre) {
        return (root, query, cb) -> {
            if (genre == null || genre.isBlank()) return null;
            return cb.equal(root.get("genre"), genre.trim());
        };
    }

    public static Specification<Book> minReleaseDate(final LocalDate minReleaseDate) {
        return (root, query, cb) -> {
            if (minReleaseDate == null) return null;
            return cb.greaterThanOrEqualTo(root.get("date"), minReleaseDate);
        };
    }

    public static Specification<Book> maxReleaseDate(final LocalDate maxReleaseDate) {
        return (root, query, cb) -> {
            if (maxReleaseDate == null) return null;
            return cb.lessThanOrEqualTo(root.get("date"), maxReleaseDate);
        };
    }
}
