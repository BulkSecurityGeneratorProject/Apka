package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.PhotosDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Photos and its DTO PhotosDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PhotosMapper extends EntityMapper<PhotosDTO, Photos> {


    @Mapping(target = "rooms", ignore = true)
    Photos toEntity(PhotosDTO photosDTO);

    default Photos fromId(Long id) {
        if (id == null) {
            return null;
        }
        Photos photos = new Photos();
        photos.setId(id);
        return photos;
    }
}
