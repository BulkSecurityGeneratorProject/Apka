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
 * A Room.
 */
@Entity
@Table(name = "room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number")
    private Integer roomNumber;

    @Column(name = "number_of_persons")
    private Integer numberOfPersons;

    @Column(name = "price")
    private Integer price;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "inventory")
    private String inventory;

    @Lob
    @Column(name = "roomimg_1")
    private byte[] roomimg1;

    @Column(name = "roomimg_1_content_type")
    private String roomimg1ContentType;

    @Lob
    @Column(name = "roomimg_2")
    private byte[] roomimg2;

    @Column(name = "roomimg_2_content_type")
    private String roomimg2ContentType;

    @Lob
    @Column(name = "roomimg_3")
    private byte[] roomimg3;

    @Column(name = "roomimg_3_content_type")
    private String roomimg3ContentType;

    @Lob
    @Column(name = "roomimg_4")
    private byte[] roomimg4;

    @Column(name = "roomimg_4_content_type")
    private String roomimg4ContentType;

    @Lob
    @Column(name = "roomimg_5")
    private byte[] roomimg5;

    @Column(name = "roomimg_5_content_type")
    private String roomimg5ContentType;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reservation> reservations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public Room roomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
        return this;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getNumberOfPersons() {
        return numberOfPersons;
    }

    public Room numberOfPersons(Integer numberOfPersons) {
        this.numberOfPersons = numberOfPersons;
        return this;
    }

    public void setNumberOfPersons(Integer numberOfPersons) {
        this.numberOfPersons = numberOfPersons;
    }

    public Integer getPrice() {
        return price;
    }

    public Room price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean isState() {
        return state;
    }

    public Room state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public String getInventory() {
        return inventory;
    }

    public Room inventory(String inventory) {
        this.inventory = inventory;
        return this;
    }

    public void setInventory(String inventory) {
        this.inventory = inventory;
    }

    public byte[] getRoomimg1() {
        return roomimg1;
    }

    public Room roomimg1(byte[] roomimg1) {
        this.roomimg1 = roomimg1;
        return this;
    }

    public void setRoomimg1(byte[] roomimg1) {
        this.roomimg1 = roomimg1;
    }

    public String getRoomimg1ContentType() {
        return roomimg1ContentType;
    }

    public Room roomimg1ContentType(String roomimg1ContentType) {
        this.roomimg1ContentType = roomimg1ContentType;
        return this;
    }

    public void setRoomimg1ContentType(String roomimg1ContentType) {
        this.roomimg1ContentType = roomimg1ContentType;
    }

    public byte[] getRoomimg2() {
        return roomimg2;
    }

    public Room roomimg2(byte[] roomimg2) {
        this.roomimg2 = roomimg2;
        return this;
    }

    public void setRoomimg2(byte[] roomimg2) {
        this.roomimg2 = roomimg2;
    }

    public String getRoomimg2ContentType() {
        return roomimg2ContentType;
    }

    public Room roomimg2ContentType(String roomimg2ContentType) {
        this.roomimg2ContentType = roomimg2ContentType;
        return this;
    }

    public void setRoomimg2ContentType(String roomimg2ContentType) {
        this.roomimg2ContentType = roomimg2ContentType;
    }

    public byte[] getRoomimg3() {
        return roomimg3;
    }

    public Room roomimg3(byte[] roomimg3) {
        this.roomimg3 = roomimg3;
        return this;
    }

    public void setRoomimg3(byte[] roomimg3) {
        this.roomimg3 = roomimg3;
    }

    public String getRoomimg3ContentType() {
        return roomimg3ContentType;
    }

    public Room roomimg3ContentType(String roomimg3ContentType) {
        this.roomimg3ContentType = roomimg3ContentType;
        return this;
    }

    public void setRoomimg3ContentType(String roomimg3ContentType) {
        this.roomimg3ContentType = roomimg3ContentType;
    }

    public byte[] getRoomimg4() {
        return roomimg4;
    }

    public Room roomimg4(byte[] roomimg4) {
        this.roomimg4 = roomimg4;
        return this;
    }

    public void setRoomimg4(byte[] roomimg4) {
        this.roomimg4 = roomimg4;
    }

    public String getRoomimg4ContentType() {
        return roomimg4ContentType;
    }

    public Room roomimg4ContentType(String roomimg4ContentType) {
        this.roomimg4ContentType = roomimg4ContentType;
        return this;
    }

    public void setRoomimg4ContentType(String roomimg4ContentType) {
        this.roomimg4ContentType = roomimg4ContentType;
    }

    public byte[] getRoomimg5() {
        return roomimg5;
    }

    public Room roomimg5(byte[] roomimg5) {
        this.roomimg5 = roomimg5;
        return this;
    }

    public void setRoomimg5(byte[] roomimg5) {
        this.roomimg5 = roomimg5;
    }

    public String getRoomimg5ContentType() {
        return roomimg5ContentType;
    }

    public Room roomimg5ContentType(String roomimg5ContentType) {
        this.roomimg5ContentType = roomimg5ContentType;
        return this;
    }

    public void setRoomimg5ContentType(String roomimg5ContentType) {
        this.roomimg5ContentType = roomimg5ContentType;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public Room reservations(Set<Reservation> reservations) {
        this.reservations = reservations;
        return this;
    }

    public Room addReservation(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.setRoom(this);
        return this;
    }

    public Room removeReservation(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.setRoom(null);
        return this;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
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
        Room room = (Room) o;
        if (room.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), room.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", roomNumber=" + getRoomNumber() +
            ", numberOfPersons=" + getNumberOfPersons() +
            ", price=" + getPrice() +
            ", state='" + isState() + "'" +
            ", inventory='" + getInventory() + "'" +
            ", roomimg1='" + getRoomimg1() + "'" +
            ", roomimg1ContentType='" + getRoomimg1ContentType() + "'" +
            ", roomimg2='" + getRoomimg2() + "'" +
            ", roomimg2ContentType='" + getRoomimg2ContentType() + "'" +
            ", roomimg3='" + getRoomimg3() + "'" +
            ", roomimg3ContentType='" + getRoomimg3ContentType() + "'" +
            ", roomimg4='" + getRoomimg4() + "'" +
            ", roomimg4ContentType='" + getRoomimg4ContentType() + "'" +
            ", roomimg5='" + getRoomimg5() + "'" +
            ", roomimg5ContentType='" + getRoomimg5ContentType() + "'" +
            "}";
    }
}
