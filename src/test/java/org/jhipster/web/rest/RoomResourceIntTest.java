package org.jhipster.web.rest;

import org.jhipster.JhipsterApp;

import org.jhipster.domain.Room;
import org.jhipster.repository.RoomRepository;
import org.jhipster.service.RoomService;
import org.jhipster.service.dto.RoomDTO;
import org.jhipster.service.mapper.RoomMapper;
import org.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RoomResource REST controller.
 *
 * @see RoomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class RoomResourceIntTest {

    private static final Integer DEFAULT_ROOM_NUMBER = 1;
    private static final Integer UPDATED_ROOM_NUMBER = 2;

    private static final Integer DEFAULT_NUMBER_OF_PERSONS = 1;
    private static final Integer UPDATED_NUMBER_OF_PERSONS = 2;

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    private static final String DEFAULT_INVENTORY = "AAAAAAAAAA";
    private static final String UPDATED_INVENTORY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ROOMIMG_1 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ROOMIMG_1 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ROOMIMG_1_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ROOMIMG_1_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_ROOMIMG_2 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ROOMIMG_2 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ROOMIMG_2_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ROOMIMG_2_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_ROOMIMG_3 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ROOMIMG_3 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ROOMIMG_3_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ROOMIMG_3_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_ROOMIMG_4 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ROOMIMG_4 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ROOMIMG_4_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ROOMIMG_4_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_ROOMIMG_5 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ROOMIMG_5 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ROOMIMG_5_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ROOMIMG_5_CONTENT_TYPE = "image/png";

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomMapper roomMapper;

    @Autowired
    private RoomService roomService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRoomMockMvc;

    private Room room;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoomResource roomResource = new RoomResource(roomService);
        this.restRoomMockMvc = MockMvcBuilders.standaloneSetup(roomResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Room createEntity(EntityManager em) {
        Room room = new Room()
            .roomNumber(DEFAULT_ROOM_NUMBER)
            .numberOfPersons(DEFAULT_NUMBER_OF_PERSONS)
            .price(DEFAULT_PRICE)
            .state(DEFAULT_STATE)
            .inventory(DEFAULT_INVENTORY)
            .roomimg1(DEFAULT_ROOMIMG_1)
            .roomimg1ContentType(DEFAULT_ROOMIMG_1_CONTENT_TYPE)
            .roomimg2(DEFAULT_ROOMIMG_2)
            .roomimg2ContentType(DEFAULT_ROOMIMG_2_CONTENT_TYPE)
            .roomimg3(DEFAULT_ROOMIMG_3)
            .roomimg3ContentType(DEFAULT_ROOMIMG_3_CONTENT_TYPE)
            .roomimg4(DEFAULT_ROOMIMG_4)
            .roomimg4ContentType(DEFAULT_ROOMIMG_4_CONTENT_TYPE)
            .roomimg5(DEFAULT_ROOMIMG_5)
            .roomimg5ContentType(DEFAULT_ROOMIMG_5_CONTENT_TYPE);
        return room;
    }

    @Before
    public void initTest() {
        room = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoom() throws Exception {
        int databaseSizeBeforeCreate = roomRepository.findAll().size();

        // Create the Room
        RoomDTO roomDTO = roomMapper.toDto(room);
        restRoomMockMvc.perform(post("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomDTO)))
            .andExpect(status().isCreated());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeCreate + 1);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getRoomNumber()).isEqualTo(DEFAULT_ROOM_NUMBER);
        assertThat(testRoom.getNumberOfPersons()).isEqualTo(DEFAULT_NUMBER_OF_PERSONS);
        assertThat(testRoom.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testRoom.isState()).isEqualTo(DEFAULT_STATE);
        assertThat(testRoom.getInventory()).isEqualTo(DEFAULT_INVENTORY);
        assertThat(testRoom.getRoomimg1()).isEqualTo(DEFAULT_ROOMIMG_1);
        assertThat(testRoom.getRoomimg1ContentType()).isEqualTo(DEFAULT_ROOMIMG_1_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg2()).isEqualTo(DEFAULT_ROOMIMG_2);
        assertThat(testRoom.getRoomimg2ContentType()).isEqualTo(DEFAULT_ROOMIMG_2_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg3()).isEqualTo(DEFAULT_ROOMIMG_3);
        assertThat(testRoom.getRoomimg3ContentType()).isEqualTo(DEFAULT_ROOMIMG_3_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg4()).isEqualTo(DEFAULT_ROOMIMG_4);
        assertThat(testRoom.getRoomimg4ContentType()).isEqualTo(DEFAULT_ROOMIMG_4_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg5()).isEqualTo(DEFAULT_ROOMIMG_5);
        assertThat(testRoom.getRoomimg5ContentType()).isEqualTo(DEFAULT_ROOMIMG_5_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createRoomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roomRepository.findAll().size();

        // Create the Room with an existing ID
        room.setId(1L);
        RoomDTO roomDTO = roomMapper.toDto(room);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoomMockMvc.perform(post("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRooms() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        // Get all the roomList
        restRoomMockMvc.perform(get("/api/rooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(room.getId().intValue())))
            .andExpect(jsonPath("$.[*].roomNumber").value(hasItem(DEFAULT_ROOM_NUMBER)))
            .andExpect(jsonPath("$.[*].numberOfPersons").value(hasItem(DEFAULT_NUMBER_OF_PERSONS)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())))
            .andExpect(jsonPath("$.[*].inventory").value(hasItem(DEFAULT_INVENTORY.toString())))
            .andExpect(jsonPath("$.[*].roomimg1ContentType").value(hasItem(DEFAULT_ROOMIMG_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].roomimg1").value(hasItem(Base64Utils.encodeToString(DEFAULT_ROOMIMG_1))))
            .andExpect(jsonPath("$.[*].roomimg2ContentType").value(hasItem(DEFAULT_ROOMIMG_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].roomimg2").value(hasItem(Base64Utils.encodeToString(DEFAULT_ROOMIMG_2))))
            .andExpect(jsonPath("$.[*].roomimg3ContentType").value(hasItem(DEFAULT_ROOMIMG_3_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].roomimg3").value(hasItem(Base64Utils.encodeToString(DEFAULT_ROOMIMG_3))))
            .andExpect(jsonPath("$.[*].roomimg4ContentType").value(hasItem(DEFAULT_ROOMIMG_4_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].roomimg4").value(hasItem(Base64Utils.encodeToString(DEFAULT_ROOMIMG_4))))
            .andExpect(jsonPath("$.[*].roomimg5ContentType").value(hasItem(DEFAULT_ROOMIMG_5_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].roomimg5").value(hasItem(Base64Utils.encodeToString(DEFAULT_ROOMIMG_5))));
    }

    @Test
    @Transactional
    public void getRoom() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);

        // Get the room
        restRoomMockMvc.perform(get("/api/rooms/{id}", room.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(room.getId().intValue()))
            .andExpect(jsonPath("$.roomNumber").value(DEFAULT_ROOM_NUMBER))
            .andExpect(jsonPath("$.numberOfPersons").value(DEFAULT_NUMBER_OF_PERSONS))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()))
            .andExpect(jsonPath("$.inventory").value(DEFAULT_INVENTORY.toString()))
            .andExpect(jsonPath("$.roomimg1ContentType").value(DEFAULT_ROOMIMG_1_CONTENT_TYPE))
            .andExpect(jsonPath("$.roomimg1").value(Base64Utils.encodeToString(DEFAULT_ROOMIMG_1)))
            .andExpect(jsonPath("$.roomimg2ContentType").value(DEFAULT_ROOMIMG_2_CONTENT_TYPE))
            .andExpect(jsonPath("$.roomimg2").value(Base64Utils.encodeToString(DEFAULT_ROOMIMG_2)))
            .andExpect(jsonPath("$.roomimg3ContentType").value(DEFAULT_ROOMIMG_3_CONTENT_TYPE))
            .andExpect(jsonPath("$.roomimg3").value(Base64Utils.encodeToString(DEFAULT_ROOMIMG_3)))
            .andExpect(jsonPath("$.roomimg4ContentType").value(DEFAULT_ROOMIMG_4_CONTENT_TYPE))
            .andExpect(jsonPath("$.roomimg4").value(Base64Utils.encodeToString(DEFAULT_ROOMIMG_4)))
            .andExpect(jsonPath("$.roomimg5ContentType").value(DEFAULT_ROOMIMG_5_CONTENT_TYPE))
            .andExpect(jsonPath("$.roomimg5").value(Base64Utils.encodeToString(DEFAULT_ROOMIMG_5)));
    }

    @Test
    @Transactional
    public void getNonExistingRoom() throws Exception {
        // Get the room
        restRoomMockMvc.perform(get("/api/rooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoom() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();

        // Update the room
        Room updatedRoom = roomRepository.findOne(room.getId());
        // Disconnect from session so that the updates on updatedRoom are not directly saved in db
        em.detach(updatedRoom);
        updatedRoom
            .roomNumber(UPDATED_ROOM_NUMBER)
            .numberOfPersons(UPDATED_NUMBER_OF_PERSONS)
            .price(UPDATED_PRICE)
            .state(UPDATED_STATE)
            .inventory(UPDATED_INVENTORY)
            .roomimg1(UPDATED_ROOMIMG_1)
            .roomimg1ContentType(UPDATED_ROOMIMG_1_CONTENT_TYPE)
            .roomimg2(UPDATED_ROOMIMG_2)
            .roomimg2ContentType(UPDATED_ROOMIMG_2_CONTENT_TYPE)
            .roomimg3(UPDATED_ROOMIMG_3)
            .roomimg3ContentType(UPDATED_ROOMIMG_3_CONTENT_TYPE)
            .roomimg4(UPDATED_ROOMIMG_4)
            .roomimg4ContentType(UPDATED_ROOMIMG_4_CONTENT_TYPE)
            .roomimg5(UPDATED_ROOMIMG_5)
            .roomimg5ContentType(UPDATED_ROOMIMG_5_CONTENT_TYPE);
        RoomDTO roomDTO = roomMapper.toDto(updatedRoom);

        restRoomMockMvc.perform(put("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomDTO)))
            .andExpect(status().isOk());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate);
        Room testRoom = roomList.get(roomList.size() - 1);
        assertThat(testRoom.getRoomNumber()).isEqualTo(UPDATED_ROOM_NUMBER);
        assertThat(testRoom.getNumberOfPersons()).isEqualTo(UPDATED_NUMBER_OF_PERSONS);
        assertThat(testRoom.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testRoom.isState()).isEqualTo(UPDATED_STATE);
        assertThat(testRoom.getInventory()).isEqualTo(UPDATED_INVENTORY);
        assertThat(testRoom.getRoomimg1()).isEqualTo(UPDATED_ROOMIMG_1);
        assertThat(testRoom.getRoomimg1ContentType()).isEqualTo(UPDATED_ROOMIMG_1_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg2()).isEqualTo(UPDATED_ROOMIMG_2);
        assertThat(testRoom.getRoomimg2ContentType()).isEqualTo(UPDATED_ROOMIMG_2_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg3()).isEqualTo(UPDATED_ROOMIMG_3);
        assertThat(testRoom.getRoomimg3ContentType()).isEqualTo(UPDATED_ROOMIMG_3_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg4()).isEqualTo(UPDATED_ROOMIMG_4);
        assertThat(testRoom.getRoomimg4ContentType()).isEqualTo(UPDATED_ROOMIMG_4_CONTENT_TYPE);
        assertThat(testRoom.getRoomimg5()).isEqualTo(UPDATED_ROOMIMG_5);
        assertThat(testRoom.getRoomimg5ContentType()).isEqualTo(UPDATED_ROOMIMG_5_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingRoom() throws Exception {
        int databaseSizeBeforeUpdate = roomRepository.findAll().size();

        // Create the Room
        RoomDTO roomDTO = roomMapper.toDto(room);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRoomMockMvc.perform(put("/api/rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomDTO)))
            .andExpect(status().isCreated());

        // Validate the Room in the database
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRoom() throws Exception {
        // Initialize the database
        roomRepository.saveAndFlush(room);
        int databaseSizeBeforeDelete = roomRepository.findAll().size();

        // Get the room
        restRoomMockMvc.perform(delete("/api/rooms/{id}", room.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Room> roomList = roomRepository.findAll();
        assertThat(roomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Room.class);
        Room room1 = new Room();
        room1.setId(1L);
        Room room2 = new Room();
        room2.setId(room1.getId());
        assertThat(room1).isEqualTo(room2);
        room2.setId(2L);
        assertThat(room1).isNotEqualTo(room2);
        room1.setId(null);
        assertThat(room1).isNotEqualTo(room2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoomDTO.class);
        RoomDTO roomDTO1 = new RoomDTO();
        roomDTO1.setId(1L);
        RoomDTO roomDTO2 = new RoomDTO();
        assertThat(roomDTO1).isNotEqualTo(roomDTO2);
        roomDTO2.setId(roomDTO1.getId());
        assertThat(roomDTO1).isEqualTo(roomDTO2);
        roomDTO2.setId(2L);
        assertThat(roomDTO1).isNotEqualTo(roomDTO2);
        roomDTO1.setId(null);
        assertThat(roomDTO1).isNotEqualTo(roomDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(roomMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(roomMapper.fromId(null)).isNull();
    }
}
