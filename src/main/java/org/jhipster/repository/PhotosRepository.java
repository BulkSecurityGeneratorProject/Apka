package org.jhipster.repository;

import org.jhipster.domain.Photos;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Photos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhotosRepository extends JpaRepository<Photos, Long> {

}
