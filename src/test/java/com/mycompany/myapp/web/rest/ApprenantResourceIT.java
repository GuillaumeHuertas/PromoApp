package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PromoApp;
import com.mycompany.myapp.domain.Apprenant;
import com.mycompany.myapp.repository.ApprenantRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ApprenantResource} REST controller.
 */
@SpringBootTest(classes = PromoApp.class)
public class ApprenantResourceIT {

    private static final String DEFAULT_FIRSTNAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRSTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    @Autowired
    private ApprenantRepository apprenantRepository;

    @Mock
    private ApprenantRepository apprenantRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restApprenantMockMvc;

    private Apprenant apprenant;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApprenantResource apprenantResource = new ApprenantResource(apprenantRepository);
        this.restApprenantMockMvc = MockMvcBuilders.standaloneSetup(apprenantResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Apprenant createEntity(EntityManager em) {
        Apprenant apprenant = new Apprenant()
            .firstname(DEFAULT_FIRSTNAME)
            .lastname(DEFAULT_LASTNAME);
        return apprenant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Apprenant createUpdatedEntity(EntityManager em) {
        Apprenant apprenant = new Apprenant()
            .firstname(UPDATED_FIRSTNAME)
            .lastname(UPDATED_LASTNAME);
        return apprenant;
    }

    @BeforeEach
    public void initTest() {
        apprenant = createEntity(em);
    }

    @Test
    @Transactional
    public void createApprenant() throws Exception {
        int databaseSizeBeforeCreate = apprenantRepository.findAll().size();

        // Create the Apprenant
        restApprenantMockMvc.perform(post("/api/apprenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isCreated());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeCreate + 1);
        Apprenant testApprenant = apprenantList.get(apprenantList.size() - 1);
        assertThat(testApprenant.getFirstname()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testApprenant.getLastname()).isEqualTo(DEFAULT_LASTNAME);
    }

    @Test
    @Transactional
    public void createApprenantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = apprenantRepository.findAll().size();

        // Create the Apprenant with an existing ID
        apprenant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApprenantMockMvc.perform(post("/api/apprenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllApprenants() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        // Get all the apprenantList
        restApprenantMockMvc.perform(get("/api/apprenants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(apprenant.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstname").value(hasItem(DEFAULT_FIRSTNAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllApprenantsWithEagerRelationshipsIsEnabled() throws Exception {
        ApprenantResource apprenantResource = new ApprenantResource(apprenantRepositoryMock);
        when(apprenantRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restApprenantMockMvc = MockMvcBuilders.standaloneSetup(apprenantResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restApprenantMockMvc.perform(get("/api/apprenants?eagerload=true"))
        .andExpect(status().isOk());

        verify(apprenantRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllApprenantsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ApprenantResource apprenantResource = new ApprenantResource(apprenantRepositoryMock);
            when(apprenantRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restApprenantMockMvc = MockMvcBuilders.standaloneSetup(apprenantResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restApprenantMockMvc.perform(get("/api/apprenants?eagerload=true"))
        .andExpect(status().isOk());

            verify(apprenantRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getApprenant() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        // Get the apprenant
        restApprenantMockMvc.perform(get("/api/apprenants/{id}", apprenant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(apprenant.getId().intValue()))
            .andExpect(jsonPath("$.firstname").value(DEFAULT_FIRSTNAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingApprenant() throws Exception {
        // Get the apprenant
        restApprenantMockMvc.perform(get("/api/apprenants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApprenant() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();

        // Update the apprenant
        Apprenant updatedApprenant = apprenantRepository.findById(apprenant.getId()).get();
        // Disconnect from session so that the updates on updatedApprenant are not directly saved in db
        em.detach(updatedApprenant);
        updatedApprenant
            .firstname(UPDATED_FIRSTNAME)
            .lastname(UPDATED_LASTNAME);

        restApprenantMockMvc.perform(put("/api/apprenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApprenant)))
            .andExpect(status().isOk());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
        Apprenant testApprenant = apprenantList.get(apprenantList.size() - 1);
        assertThat(testApprenant.getFirstname()).isEqualTo(UPDATED_FIRSTNAME);
        assertThat(testApprenant.getLastname()).isEqualTo(UPDATED_LASTNAME);
    }

    @Test
    @Transactional
    public void updateNonExistingApprenant() throws Exception {
        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();

        // Create the Apprenant

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApprenantMockMvc.perform(put("/api/apprenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApprenant() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        int databaseSizeBeforeDelete = apprenantRepository.findAll().size();

        // Delete the apprenant
        restApprenantMockMvc.perform(delete("/api/apprenants/{id}", apprenant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Apprenant.class);
        Apprenant apprenant1 = new Apprenant();
        apprenant1.setId(1L);
        Apprenant apprenant2 = new Apprenant();
        apprenant2.setId(apprenant1.getId());
        assertThat(apprenant1).isEqualTo(apprenant2);
        apprenant2.setId(2L);
        assertThat(apprenant1).isNotEqualTo(apprenant2);
        apprenant1.setId(null);
        assertThat(apprenant1).isNotEqualTo(apprenant2);
    }
}
