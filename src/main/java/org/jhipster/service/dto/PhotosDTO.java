package org.jhipster.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Photos entity.
 */
public class PhotosDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] roomimg1;
    private String roomimg1ContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getRoomimg1() {
        return roomimg1;
    }

    public void setRoomimg1(byte[] roomimg1) {
        this.roomimg1 = roomimg1;
    }

    public String getRoomimg1ContentType() {
        return roomimg1ContentType;
    }

    public void setRoomimg1ContentType(String roomimg1ContentType) {
        this.roomimg1ContentType = roomimg1ContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PhotosDTO photosDTO = (PhotosDTO) o;
        if(photosDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), photosDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PhotosDTO{" +
            "id=" + getId() +
            ", roomimg1='" + getRoomimg1() + "'" +
            "}";
    }
}
