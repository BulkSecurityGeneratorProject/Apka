package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.ReservationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Reservation and its DTO ReservationDTO.
 */
@Mapper(componentModel = "spring", uses = {ClientMapper.class, RoomMapper.class})
public interface ReservationMapper extends EntityMapper<ReservationDTO, Reservation> {

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "room.id", target = "roomId")
    ReservationDTO toDto(Reservation reservation);

    @Mapping(source = "clientId", target = "client")
    @Mapping(source = "roomId", target = "room")
    Reservation toEntity(ReservationDTO reservationDTO);

    default Reservation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reservation reservation = new Reservation();
        reservation.setId(id);
        return reservation;
    }
}
