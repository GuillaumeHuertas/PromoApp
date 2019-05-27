package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Apprenant;
import com.mycompany.myapp.repository.ApprenantRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Apprenant}.
 */
@RestController
@RequestMapping("/api")
public class ApprenantResource {

    private final Logger log = LoggerFactory.getLogger(ApprenantResource.class);

    private static final String ENTITY_NAME = "apprenant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ApprenantRepository apprenantRepository;

    public ApprenantResource(ApprenantRepository apprenantRepository) {
        this.apprenantRepository = apprenantRepository;
    }

    /**
     * {@code POST  /apprenants} : Create a new apprenant.
     *
     * @param apprenant the apprenant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new apprenant, or with status {@code 400 (Bad Request)} if the apprenant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/apprenants")
    public ResponseEntity<Apprenant> createApprenant(@RequestBody Apprenant apprenant) throws URISyntaxException {
        log.debug("REST request to save Apprenant : {}", apprenant);
        if (apprenant.getId() != null) {
            throw new BadRequestAlertException("A new apprenant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Apprenant result = apprenantRepository.save(apprenant);
        return ResponseEntity.created(new URI("/api/apprenants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /apprenants} : Updates an existing apprenant.
     *
     * @param apprenant the apprenant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated apprenant,
     * or with status {@code 400 (Bad Request)} if the apprenant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the apprenant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/apprenants")
    public ResponseEntity<Apprenant> updateApprenant(@RequestBody Apprenant apprenant) throws URISyntaxException {
        log.debug("REST request to update Apprenant : {}", apprenant);
        if (apprenant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Apprenant result = apprenantRepository.save(apprenant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, apprenant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /apprenants} : get all the apprenants.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of apprenants in body.
     */
    @GetMapping("/apprenants")
    public List<Apprenant> getAllApprenants(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Apprenants");
        return apprenantRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /apprenants/:id} : get the "id" apprenant.
     *
     * @param id the id of the apprenant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the apprenant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/apprenants/{id}")
    public ResponseEntity<Apprenant> getApprenant(@PathVariable Long id) {
        log.debug("REST request to get Apprenant : {}", id);
        Optional<Apprenant> apprenant = apprenantRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(apprenant);
    }

    /**
     * {@code DELETE  /apprenants/:id} : delete the "id" apprenant.
     *
     * @param id the id of the apprenant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/apprenants/{id}")
    public ResponseEntity<Void> deleteApprenant(@PathVariable Long id) {
        log.debug("REST request to delete Apprenant : {}", id);
        apprenantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
