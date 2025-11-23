package com.library.library.entity;

// Book Entity
//
// Fields
// Author, ID, Title, Description, Date, Genre, FileLink

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Books")
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String fileLink;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private String genre;
}
