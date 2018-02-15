package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.RoomDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Room and its DTO RoomDTO.
 */
@Mapper(componentModel = "spring", uses = {PhotosMapper.class})
public interface RoomMapper extends EntityMapper<RoomDTO, Room> {


    @Mapping(target = "reservations", ignore = true)
    Room toEntity(RoomDTO roomDTO);

    default Room fromId(Long id) {
        if (id == null) {
            return null;
        }
        Room room = new Room();
        room.setId(id);
        return room;
    }
}
