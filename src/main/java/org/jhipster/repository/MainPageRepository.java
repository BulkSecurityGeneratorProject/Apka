package org.jhipster.repository;

import org.jhipster.domain.MainPage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MainPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MainPageRepository extends JpaRepository<MainPage, Long> {

}
