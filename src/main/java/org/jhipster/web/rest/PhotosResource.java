package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.service.PhotosService;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.service.dto.PhotosDTO;
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
 * REST controller for managing Photos.
 */
@RestController
@RequestMapping("/api")
public class PhotosResource {

    private final Logger log = LoggerFactory.getLogger(PhotosResource.class);

    private static final String ENTITY_NAME = "photos";

    private final PhotosService photosService;

    public PhotosResource(PhotosService photosService) {
        this.photosService = photosService;
    }

    /**
     * POST  /photos : Create a new photos.
     *
     * @param photosDTO the photosDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new photosDTO, or with status 400 (Bad Request) if the photos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/photos")
    @Timed
    public ResponseEntity<PhotosDTO> createPhotos(@RequestBody PhotosDTO photosDTO) throws URISyntaxException {
        log.debug("REST request to save Photos : {}", photosDTO);
        if (photosDTO.getId() != null) {
            throw new BadRequestAlertException("A new photos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PhotosDTO result = photosService.save(photosDTO);
        return ResponseEntity.created(new URI("/api/photos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /photos : Updates an existing photos.
     *
     * @param photosDTO the photosDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated photosDTO,
     * or with status 400 (Bad Request) if the photosDTO is not valid,
     * or with status 500 (Internal Server Error) if the photosDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/photos")
    @Timed
    public ResponseEntity<PhotosDTO> updatePhotos(@RequestBody PhotosDTO photosDTO) throws URISyntaxException {
        log.debug("REST request to update Photos : {}", photosDTO);
        if (photosDTO.getId() == null) {
            return createPhotos(photosDTO);
        }
        PhotosDTO result = photosService.save(photosDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, photosDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /photos : get all the photos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of photos in body
     */
    @GetMapping("/photos")
    @Timed
    public List<PhotosDTO> getAllPhotos() {
        log.debug("REST request to get all Photos");
        return photosService.findAll();
        }

    /**
     * GET  /photos/:id : get the "id" photos.
     *
     * @param id the id of the photosDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the photosDTO, or with status 404 (Not Found)
     */
    @GetMapping("/photos/{id}")
    @Timed
    public ResponseEntity<PhotosDTO> getPhotos(@PathVariable Long id) {
        log.debug("REST request to get Photos : {}", id);
        PhotosDTO photosDTO = photosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(photosDTO));
    }

    /**
     * DELETE  /photos/:id : delete the "id" photos.
     *
     * @param id the id of the photosDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/photos/{id}")
    @Timed
    public ResponseEntity<Void> deletePhotos(@PathVariable Long id) {
        log.debug("REST request to delete Photos : {}", id);
        photosService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
