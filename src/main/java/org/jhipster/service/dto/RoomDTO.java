package org.jhipster.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Room entity.
 */
public class RoomDTO implements Serializable {

    private Long id;

    private Integer roomNumber;

    private Integer numberOfPersons;

    private Integer price;

    private Boolean state;

    private String inventory;

    private Set<PhotosDTO> photos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getNumberOfPersons() {
        return numberOfPersons;
    }

    public void setNumberOfPersons(Integer numberOfPersons) {
        this.numberOfPersons = numberOfPersons;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean isState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public String getInventory() {
        return inventory;
    }

    public void setInventory(String inventory) {
        this.inventory = inventory;
    }

    public Set<PhotosDTO> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<PhotosDTO> photos) {
        this.photos = photos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RoomDTO roomDTO = (RoomDTO) o;
        if(roomDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), roomDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoomDTO{" +
            "id=" + getId() +
            ", roomNumber=" + getRoomNumber() +
            ", numberOfPersons=" + getNumberOfPersons() +
            ", price=" + getPrice() +
            ", state='" + isState() + "'" +
            ", inventory='" + getInventory() + "'" +
            "}";
    }
}
