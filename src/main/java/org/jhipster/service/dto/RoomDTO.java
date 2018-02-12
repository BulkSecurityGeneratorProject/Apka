package org.jhipster.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

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

    @Lob
    private byte[] roomimg1;
    private String roomimg1ContentType;

    @Lob
    private byte[] roomimg2;
    private String roomimg2ContentType;

    @Lob
    private byte[] roomimg3;
    private String roomimg3ContentType;

    @Lob
    private byte[] roomimg4;
    private String roomimg4ContentType;

    @Lob
    private byte[] roomimg5;
    private String roomimg5ContentType;

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

    public byte[] getRoomimg2() {
        return roomimg2;
    }

    public void setRoomimg2(byte[] roomimg2) {
        this.roomimg2 = roomimg2;
    }

    public String getRoomimg2ContentType() {
        return roomimg2ContentType;
    }

    public void setRoomimg2ContentType(String roomimg2ContentType) {
        this.roomimg2ContentType = roomimg2ContentType;
    }

    public byte[] getRoomimg3() {
        return roomimg3;
    }

    public void setRoomimg3(byte[] roomimg3) {
        this.roomimg3 = roomimg3;
    }

    public String getRoomimg3ContentType() {
        return roomimg3ContentType;
    }

    public void setRoomimg3ContentType(String roomimg3ContentType) {
        this.roomimg3ContentType = roomimg3ContentType;
    }

    public byte[] getRoomimg4() {
        return roomimg4;
    }

    public void setRoomimg4(byte[] roomimg4) {
        this.roomimg4 = roomimg4;
    }

    public String getRoomimg4ContentType() {
        return roomimg4ContentType;
    }

    public void setRoomimg4ContentType(String roomimg4ContentType) {
        this.roomimg4ContentType = roomimg4ContentType;
    }

    public byte[] getRoomimg5() {
        return roomimg5;
    }

    public void setRoomimg5(byte[] roomimg5) {
        this.roomimg5 = roomimg5;
    }

    public String getRoomimg5ContentType() {
        return roomimg5ContentType;
    }

    public void setRoomimg5ContentType(String roomimg5ContentType) {
        this.roomimg5ContentType = roomimg5ContentType;
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
            ", roomimg1='" + getRoomimg1() + "'" +
            ", roomimg2='" + getRoomimg2() + "'" +
            ", roomimg3='" + getRoomimg3() + "'" +
            ", roomimg4='" + getRoomimg4() + "'" +
            ", roomimg5='" + getRoomimg5() + "'" +
            "}";
    }
}
