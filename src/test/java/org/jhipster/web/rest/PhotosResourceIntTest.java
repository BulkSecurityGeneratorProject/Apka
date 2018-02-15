package org.jhipster.web.rest;

import org.jhipster.JhipsterApp;

import org.jhipster.domain.Photos;
import org.jhipster.repository.PhotosRepository;
import org.jhipster.service.PhotosService;
import org.jhipster.service.dto.PhotosDTO;
import org.jhipster.service.mapper.PhotosMapper;
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
 * Test class for the PhotosResource REST controller.
 *
 * @see PhotosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class PhotosResourceIntTest {

    private static final byte[] DEFAULT_ROOMIMG_1 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ROOMIMG_1 = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ROOMIMG_1_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ROOMIMG_1_CONTENT_TYPE = "image/png";

    @Autowired
    private PhotosRepository photosRepository;

    @Autowired
    private PhotosMapper photosMapper;

    @Autowired
    private PhotosService photosService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPhotosMockMvc;

    private Photos photos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PhotosResource photosResource = new PhotosResource(photosService);
        this.restPhotosMockMvc = MockMvcBuilders.standaloneSetup(photosResource)
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
    public static Photos createEntity(EntityManager em) {
        Photos photos = new Photos()
            .roomimg1(DEFAULT_ROOMIMG_1)
            .roomimg1ContentType(DEFAULT_ROOMIMG_1_CONTENT_TYPE);
        return photos;
    }

    @Before
    public void initTest() {
        photos = createEntity(em);
    }

    @Test
    @Transactional
    public void createPhotos() throws Exception {
        int databaseSizeBeforeCreate = photosRepository.findAll().size();

        // Create the Photos
        PhotosDTO photosDTO = photosMapper.toDto(photos);
        restPhotosMockMvc.perform(post("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photosDTO)))
            .andExpect(status().isCreated());

        // Validate the Photos in the database
        List<Photos> photosList = photosRepository.findAll();
        assertThat(photosList).hasSize(databaseSizeBeforeCreate + 1);
        Photos testPhotos = photosList.get(photosList.size() - 1);
        assertThat(testPhotos.getRoomimg1()).isEqualTo(DEFAULT_ROOMIMG_1);
        assertThat(testPhotos.getRoomimg1ContentType()).isEqualTo(DEFAULT_ROOMIMG_1_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createPhotosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = photosRepository.findAll().size();

        // Create the Photos with an existing ID
        photos.setId(1L);
        PhotosDTO photosDTO = photosMapper.toDto(photos);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhotosMockMvc.perform(post("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photosDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Photos in the database
        List<Photos> photosList = photosRepository.findAll();
        assertThat(photosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPhotos() throws Exception {
        // Initialize the database
        photosRepository.saveAndFlush(photos);

        // Get all the photosList
        restPhotosMockMvc.perform(get("/api/photos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(photos.getId().intValue())))
            .andExpect(jsonPath("$.[*].roomimg1ContentType").value(hasItem(DEFAULT_ROOMIMG_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].roomimg1").value(hasItem(Base64Utils.encodeToString(DEFAULT_ROOMIMG_1))));
    }

    @Test
    @Transactional
    public void getPhotos() throws Exception {
        // Initialize the database
        photosRepository.saveAndFlush(photos);

        // Get the photos
        restPhotosMockMvc.perform(get("/api/photos/{id}", photos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(photos.getId().intValue()))
            .andExpect(jsonPath("$.roomimg1ContentType").value(DEFAULT_ROOMIMG_1_CONTENT_TYPE))
            .andExpect(jsonPath("$.roomimg1").value(Base64Utils.encodeToString(DEFAULT_ROOMIMG_1)));
    }

    @Test
    @Transactional
    public void getNonExistingPhotos() throws Exception {
        // Get the photos
        restPhotosMockMvc.perform(get("/api/photos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhotos() throws Exception {
        // Initialize the database
        photosRepository.saveAndFlush(photos);
        int databaseSizeBeforeUpdate = photosRepository.findAll().size();

        // Update the photos
        Photos updatedPhotos = photosRepository.findOne(photos.getId());
        // Disconnect from session so that the updates on updatedPhotos are not directly saved in db
        em.detach(updatedPhotos);
        updatedPhotos
            .roomimg1(UPDATED_ROOMIMG_1)
            .roomimg1ContentType(UPDATED_ROOMIMG_1_CONTENT_TYPE);
        PhotosDTO photosDTO = photosMapper.toDto(updatedPhotos);

        restPhotosMockMvc.perform(put("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photosDTO)))
            .andExpect(status().isOk());

        // Validate the Photos in the database
        List<Photos> photosList = photosRepository.findAll();
        assertThat(photosList).hasSize(databaseSizeBeforeUpdate);
        Photos testPhotos = photosList.get(photosList.size() - 1);
        assertThat(testPhotos.getRoomimg1()).isEqualTo(UPDATED_ROOMIMG_1);
        assertThat(testPhotos.getRoomimg1ContentType()).isEqualTo(UPDATED_ROOMIMG_1_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingPhotos() throws Exception {
        int databaseSizeBeforeUpdate = photosRepository.findAll().size();

        // Create the Photos
        PhotosDTO photosDTO = photosMapper.toDto(photos);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPhotosMockMvc.perform(put("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photosDTO)))
            .andExpect(status().isCreated());

        // Validate the Photos in the database
        List<Photos> photosList = photosRepository.findAll();
        assertThat(photosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePhotos() throws Exception {
        // Initialize the database
        photosRepository.saveAndFlush(photos);
        int databaseSizeBeforeDelete = photosRepository.findAll().size();

        // Get the photos
        restPhotosMockMvc.perform(delete("/api/photos/{id}", photos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Photos> photosList = photosRepository.findAll();
        assertThat(photosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Photos.class);
        Photos photos1 = new Photos();
        photos1.setId(1L);
        Photos photos2 = new Photos();
        photos2.setId(photos1.getId());
        assertThat(photos1).isEqualTo(photos2);
        photos2.setId(2L);
        assertThat(photos1).isNotEqualTo(photos2);
        photos1.setId(null);
        assertThat(photos1).isNotEqualTo(photos2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PhotosDTO.class);
        PhotosDTO photosDTO1 = new PhotosDTO();
        photosDTO1.setId(1L);
        PhotosDTO photosDTO2 = new PhotosDTO();
        assertThat(photosDTO1).isNotEqualTo(photosDTO2);
        photosDTO2.setId(photosDTO1.getId());
        assertThat(photosDTO1).isEqualTo(photosDTO2);
        photosDTO2.setId(2L);
        assertThat(photosDTO1).isNotEqualTo(photosDTO2);
        photosDTO1.setId(null);
        assertThat(photosDTO1).isNotEqualTo(photosDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(photosMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(photosMapper.fromId(null)).isNull();
    }
}
