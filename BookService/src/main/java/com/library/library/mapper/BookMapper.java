package com.library.library.mapper;

import com.library.library.DTO.BookRequestDTO;
import com.library.library.DTO.BookResponseDTO;
import com.library.library.entity.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book toEntity(BookRequestDTO dto);

    BookResponseDTO toDto(Book entity);
}
