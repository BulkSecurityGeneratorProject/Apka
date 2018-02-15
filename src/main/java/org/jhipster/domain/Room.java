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

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reservation> reservations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "room_photos",
               joinColumns = @JoinColumn(name="rooms_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="photos_id", referencedColumnName="id"))
    private Set<Photos> photos = new HashSet<>();

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

    public Set<Photos> getPhotos() {
        return photos;
    }

    public Room photos(Set<Photos> photos) {
        this.photos = photos;
        return this;
    }

    public Room addPhotos(Photos photos) {
        this.photos.add(photos);
        photos.getRooms().add(this);
        return this;
    }

    public Room removePhotos(Photos photos) {
        this.photos.remove(photos);
        photos.getRooms().remove(this);
        return this;
    }

    public void setPhotos(Set<Photos> photos) {
        this.photos = photos;
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
            "}";
    }
}
