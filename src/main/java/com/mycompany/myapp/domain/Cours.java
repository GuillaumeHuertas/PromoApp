package com.mycompany.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cours.
 */
@Entity
@Table(name = "cours")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cours implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "theme")
    private String theme;

    @Column(name = "duration")
    private Integer duration;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cours_apprenant",
               joinColumns = @JoinColumn(name = "cours_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "apprenant_id", referencedColumnName = "id"))
    private Set<Apprenant> apprenants = new HashSet<>();

    @ManyToMany(mappedBy = "cours")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Formation> formations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public Cours theme(String theme) {
        this.theme = theme;
        return this;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Integer getDuration() {
        return duration;
    }

    public Cours duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Set<Apprenant> getApprenants() {
        return apprenants;
    }

    public Cours apprenants(Set<Apprenant> apprenants) {
        this.apprenants = apprenants;
        return this;
    }

    public Cours addApprenant(Apprenant apprenant) {
        this.apprenants.add(apprenant);
        apprenant.getCours().add(this);
        return this;
    }

    public Cours removeApprenant(Apprenant apprenant) {
        this.apprenants.remove(apprenant);
        apprenant.getCours().remove(this);
        return this;
    }

    public void setApprenants(Set<Apprenant> apprenants) {
        this.apprenants = apprenants;
    }

    public Set<Formation> getFormations() {
        return formations;
    }

    public Cours formations(Set<Formation> formations) {
        this.formations = formations;
        return this;
    }

    public Cours addFormation(Formation formation) {
        this.formations.add(formation);
        formation.getCours().add(this);
        return this;
    }

    public Cours removeFormation(Formation formation) {
        this.formations.remove(formation);
        formation.getCours().remove(this);
        return this;
    }

    public void setFormations(Set<Formation> formations) {
        this.formations = formations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cours)) {
            return false;
        }
        return id != null && id.equals(((Cours) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cours{" +
            "id=" + getId() +
            ", theme='" + getTheme() + "'" +
            ", duration=" + getDuration() +
            "}";
    }
}
