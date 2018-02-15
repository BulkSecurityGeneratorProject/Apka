package org.jhipster.repository;

import org.jhipster.domain.Room;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Room entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("select distinct room from Room room left join fetch room.photos")
    List<Room> findAllWithEagerRelationships();

    @Query("select room from Room room left join fetch room.photos where room.id =:id")
    Room findOneWithEagerRelationships(@Param("id") Long id);

}
