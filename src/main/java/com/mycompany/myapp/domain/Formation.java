package com.mycompany.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Formation.
 */
@Entity
@Table(name = "formation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Formation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "intitule")
    private String intitule;

    @Column(name = "teacher")
    private String teacher;

    @OneToMany(mappedBy = "formation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Promo> promos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "formation_cours",
               joinColumns = @JoinColumn(name = "formation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "cours_id", referencedColumnName = "id"))
    private Set<Cours> cours = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("formations")
    private Niveau niveau;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public Formation intitule(String intitule) {
        this.intitule = intitule;
        return this;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public String getTeacher() {
        return teacher;
    }

    public Formation teacher(String teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public Set<Promo> getPromos() {
        return promos;
    }

    public Formation promos(Set<Promo> promos) {
        this.promos = promos;
        return this;
    }

    public Formation addPromo(Promo promo) {
        this.promos.add(promo);
        promo.setFormation(this);
        return this;
    }

    public Formation removePromo(Promo promo) {
        this.promos.remove(promo);
        promo.setFormation(null);
        return this;
    }

    public void setPromos(Set<Promo> promos) {
        this.promos = promos;
    }

    public Set<Cours> getCours() {
        return cours;
    }

    public Formation cours(Set<Cours> cours) {
        this.cours = cours;
        return this;
    }

    public Formation addCours(Cours cours) {
        this.cours.add(cours);
        cours.getFormations().add(this);
        return this;
    }

    public Formation removeCours(Cours cours) {
        this.cours.remove(cours);
        cours.getFormations().remove(this);
        return this;
    }

    public void setCours(Set<Cours> cours) {
        this.cours = cours;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public Formation niveau(Niveau niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Formation)) {
            return false;
        }
        return id != null && id.equals(((Formation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Formation{" +
            "id=" + getId() +
            ", intitule='" + getIntitule() + "'" +
            ", teacher='" + getTeacher() + "'" +
            "}";
    }
}
