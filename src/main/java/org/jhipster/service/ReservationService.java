package org.jhipster.service;

import org.jhipster.service.dto.ReservationDTO;
import java.util.List;

/**
 * Service Interface for managing Reservation.
 */
public interface ReservationService {

    /**
     * Save a reservation.
     *
     * @param reservationDTO the entity to save
     * @return the persisted entity
     */
    ReservationDTO save(ReservationDTO reservationDTO);

    /**
     * Get all the reservations.
     *
     * @return the list of entities
     */
    List<ReservationDTO> findAll();

    /**
     * Get the "id" reservation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ReservationDTO findOne(Long id);

    /**
     * Delete the "id" reservation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
