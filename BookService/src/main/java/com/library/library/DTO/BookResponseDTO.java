package com.library.library.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDTO implements Serializable {
    private Long id;
    private String fileLink;
    private String author;
    private LocalDate date;
    private String title;
    private String description;
    private String genre;
}
