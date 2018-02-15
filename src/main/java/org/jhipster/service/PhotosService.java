package org.jhipster.service;

import org.jhipster.service.dto.PhotosDTO;
import java.util.List;

/**
 * Service Interface for managing Photos.
 */
public interface PhotosService {

    /**
     * Save a photos.
     *
     * @param photosDTO the entity to save
     * @return the persisted entity
     */
    PhotosDTO save(PhotosDTO photosDTO);

    /**
     * Get all the photos.
     *
     * @return the list of entities
     */
    List<PhotosDTO> findAll();

    /**
     * Get the "id" photos.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PhotosDTO findOne(Long id);

    /**
     * Delete the "id" photos.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
