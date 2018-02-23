package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.domain.MainPage;

import org.jhipster.repository.MainPageRepository;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MainPage.
 */
@RestController
@RequestMapping("/api")
public class MainPageResource {

    private final Logger log = LoggerFactory.getLogger(MainPageResource.class);

    private static final String ENTITY_NAME = "mainPage";

    private final MainPageRepository mainPageRepository;

    public MainPageResource(MainPageRepository mainPageRepository) {
        this.mainPageRepository = mainPageRepository;
    }

    /**
     * POST  /main-pages : Create a new mainPage.
     *
     * @param mainPage the mainPage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mainPage, or with status 400 (Bad Request) if the mainPage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/main-pages")
    @Timed
    public ResponseEntity<MainPage> createMainPage(@RequestBody MainPage mainPage) throws URISyntaxException {
        log.debug("REST request to save MainPage : {}", mainPage);
        if (mainPage.getId() != null) {
            throw new BadRequestAlertException("A new mainPage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MainPage result = mainPageRepository.save(mainPage);
        return ResponseEntity.created(new URI("/api/main-pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /main-pages : Updates an existing mainPage.
     *
     * @param mainPage the mainPage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mainPage,
     * or with status 400 (Bad Request) if the mainPage is not valid,
     * or with status 500 (Internal Server Error) if the mainPage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/main-pages")
    @Timed
    public ResponseEntity<MainPage> updateMainPage(@RequestBody MainPage mainPage) throws URISyntaxException {
        log.debug("REST request to update MainPage : {}", mainPage);
        if (mainPage.getId() == null) {
            return createMainPage(mainPage);
        }
        MainPage result = mainPageRepository.save(mainPage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mainPage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /main-pages : get all the mainPages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mainPages in body
     */
    @GetMapping("/main-pages")
    @Timed
    public List<MainPage> getAllMainPages() {
        log.debug("REST request to get all MainPages");
        return mainPageRepository.findAll();
        }

    /**
     * GET  /main-pages/:id : get the "id" mainPage.
     *
     * @param id the id of the mainPage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mainPage, or with status 404 (Not Found)
     */
    @GetMapping("/main-pages/{id}")
    @Timed
    public ResponseEntity<MainPage> getMainPage(@PathVariable Long id) {
        log.debug("REST request to get MainPage : {}", id);
        MainPage mainPage = mainPageRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mainPage));
    }

    /**
     * DELETE  /main-pages/:id : delete the "id" mainPage.
     *
     * @param id the id of the mainPage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/main-pages/{id}")
    @Timed
    public ResponseEntity<Void> deleteMainPage(@PathVariable Long id) {
        log.debug("REST request to delete MainPage : {}", id);
        mainPageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
