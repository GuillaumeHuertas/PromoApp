package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Apprenant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Apprenant entity.
 */
@Repository
public interface ApprenantRepository extends JpaRepository<Apprenant, Long> {

    @Query(value = "select distinct apprenant from Apprenant apprenant left join fetch apprenant.cours",
        countQuery = "select count(distinct apprenant) from Apprenant apprenant")
    Page<Apprenant> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct apprenant from Apprenant apprenant left join fetch apprenant.cours")
    List<Apprenant> findAllWithEagerRelationships();

    @Query("select apprenant from Apprenant apprenant left join fetch apprenant.cours where apprenant.id =:id")
    Optional<Apprenant> findOneWithEagerRelationships(@Param("id") Long id);

}
