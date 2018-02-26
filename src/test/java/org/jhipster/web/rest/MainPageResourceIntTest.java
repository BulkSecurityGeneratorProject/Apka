package org.jhipster.web.rest;

import org.jhipster.JhipsterApp;

import org.jhipster.domain.MainPage;
import org.jhipster.repository.MainPageRepository;
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
 * Test class for the MainPageResource REST controller.
 *
 * @see MainPageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class MainPageResourceIntTest {

    private static final byte[] DEFAULT_HOME_PAGE_IMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_HOME_PAGE_IMG = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_HOME_PAGE_IMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_HOME_PAGE_IMG_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_HOMEPAGE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_HOMEPAGE_TEXT = "BBBBBBBBBB";

    @Autowired
    private MainPageRepository mainPageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMainPageMockMvc;

    private MainPage mainPage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MainPageResource mainPageResource = new MainPageResource(mainPageRepository);
        this.restMainPageMockMvc = MockMvcBuilders.standaloneSetup(mainPageResource)
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
    public static MainPage createEntity(EntityManager em) {
        MainPage mainPage = new MainPage()
            .homePageImg(DEFAULT_HOME_PAGE_IMG)
            .homePageImgContentType(DEFAULT_HOME_PAGE_IMG_CONTENT_TYPE)
            .homepageText(DEFAULT_HOMEPAGE_TEXT);
        return mainPage;
    }

    @Before
    public void initTest() {
        mainPage = createEntity(em);
    }

    @Test
    @Transactional
    public void createMainPage() throws Exception {
        int databaseSizeBeforeCreate = mainPageRepository.findAll().size();

        // Create the MainPage
        restMainPageMockMvc.perform(post("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainPage)))
            .andExpect(status().isCreated());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeCreate + 1);
        MainPage testMainPage = mainPageList.get(mainPageList.size() - 1);
        assertThat(testMainPage.getHomePageImg()).isEqualTo(DEFAULT_HOME_PAGE_IMG);
        assertThat(testMainPage.getHomePageImgContentType()).isEqualTo(DEFAULT_HOME_PAGE_IMG_CONTENT_TYPE);
        assertThat(testMainPage.getHomepageText()).isEqualTo(DEFAULT_HOMEPAGE_TEXT);
    }

    @Test
    @Transactional
    public void createMainPageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mainPageRepository.findAll().size();

        // Create the MainPage with an existing ID
        mainPage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMainPageMockMvc.perform(post("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainPage)))
            .andExpect(status().isBadRequest());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMainPages() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);

        // Get all the mainPageList
        restMainPageMockMvc.perform(get("/api/main-pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mainPage.getId().intValue())))
            .andExpect(jsonPath("$.[*].homePageImgContentType").value(hasItem(DEFAULT_HOME_PAGE_IMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].homePageImg").value(hasItem(Base64Utils.encodeToString(DEFAULT_HOME_PAGE_IMG))))
            .andExpect(jsonPath("$.[*].homepageText").value(hasItem(DEFAULT_HOMEPAGE_TEXT.toString())));
    }

    @Test
    @Transactional
    public void getMainPage() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);

        // Get the mainPage
        restMainPageMockMvc.perform(get("/api/main-pages/{id}", mainPage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mainPage.getId().intValue()))
            .andExpect(jsonPath("$.homePageImgContentType").value(DEFAULT_HOME_PAGE_IMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.homePageImg").value(Base64Utils.encodeToString(DEFAULT_HOME_PAGE_IMG)))
            .andExpect(jsonPath("$.homepageText").value(DEFAULT_HOMEPAGE_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMainPage() throws Exception {
        // Get the mainPage
        restMainPageMockMvc.perform(get("/api/main-pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMainPage() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);
        int databaseSizeBeforeUpdate = mainPageRepository.findAll().size();

        // Update the mainPage
        MainPage updatedMainPage = mainPageRepository.findOne(mainPage.getId());
        // Disconnect from session so that the updates on updatedMainPage are not directly saved in db
        em.detach(updatedMainPage);
        updatedMainPage
            .homePageImg(UPDATED_HOME_PAGE_IMG)
            .homePageImgContentType(UPDATED_HOME_PAGE_IMG_CONTENT_TYPE)
            .homepageText(UPDATED_HOMEPAGE_TEXT);

        restMainPageMockMvc.perform(put("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMainPage)))
            .andExpect(status().isOk());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeUpdate);
        MainPage testMainPage = mainPageList.get(mainPageList.size() - 1);
        assertThat(testMainPage.getHomePageImg()).isEqualTo(UPDATED_HOME_PAGE_IMG);
        assertThat(testMainPage.getHomePageImgContentType()).isEqualTo(UPDATED_HOME_PAGE_IMG_CONTENT_TYPE);
        assertThat(testMainPage.getHomepageText()).isEqualTo(UPDATED_HOMEPAGE_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingMainPage() throws Exception {
        int databaseSizeBeforeUpdate = mainPageRepository.findAll().size();

        // Create the MainPage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMainPageMockMvc.perform(put("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainPage)))
            .andExpect(status().isCreated());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMainPage() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);
        int databaseSizeBeforeDelete = mainPageRepository.findAll().size();

        // Get the mainPage
        restMainPageMockMvc.perform(delete("/api/main-pages/{id}", mainPage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MainPage.class);
        MainPage mainPage1 = new MainPage();
        mainPage1.setId(1L);
        MainPage mainPage2 = new MainPage();
        mainPage2.setId(mainPage1.getId());
        assertThat(mainPage1).isEqualTo(mainPage2);
        mainPage2.setId(2L);
        assertThat(mainPage1).isNotEqualTo(mainPage2);
        mainPage1.setId(null);
        assertThat(mainPage1).isNotEqualTo(mainPage2);
    }
}
