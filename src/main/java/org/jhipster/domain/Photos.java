package org.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Photos.
 */
@Entity
@Table(name = "photos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Photos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "roomimg_1")
    private byte[] roomimg1;

    @Column(name = "roomimg_1_content_type")
    private String roomimg1ContentType;

    @ManyToMany(mappedBy = "photos")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Room> rooms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getRoomimg1() {
        return roomimg1;
    }

    public Photos roomimg1(byte[] roomimg1) {
        this.roomimg1 = roomimg1;
        return this;
    }

    public void setRoomimg1(byte[] roomimg1) {
        this.roomimg1 = roomimg1;
    }

    public String getRoomimg1ContentType() {
        return roomimg1ContentType;
    }

    public Photos roomimg1ContentType(String roomimg1ContentType) {
        this.roomimg1ContentType = roomimg1ContentType;
        return this;
    }

    public void setRoomimg1ContentType(String roomimg1ContentType) {
        this.roomimg1ContentType = roomimg1ContentType;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public Photos rooms(Set<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public Photos addRoom(Room room) {
        this.rooms.add(room);
        room.getPhotos().add(this);
        return this;
    }

    public Photos removeRoom(Room room) {
        this.rooms.remove(room);
        room.getPhotos().remove(this);
        return this;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Photos photos = (Photos) o;
        if (photos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), photos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Photos{" +
            "id=" + getId() +
            ", roomimg1='" + getRoomimg1() + "'" +
            ", roomimg1ContentType='" + getRoomimg1ContentType() + "'" +
            "}";
    }
}
