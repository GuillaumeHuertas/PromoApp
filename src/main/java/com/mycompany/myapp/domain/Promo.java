package com.mycompany.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Promo.
 */
@Entity
@Table(name = "promo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Promo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "jhi_start")
    private LocalDate start;

    @Column(name = "jhi_end")
    private LocalDate end;

    @OneToMany(mappedBy = "promo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Apprenant> apprenants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("promos")
    private Formation formation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Promo code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getStart() {
        return start;
    }

    public Promo start(LocalDate start) {
        this.start = start;
        return this;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public Promo end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Set<Apprenant> getApprenants() {
        return apprenants;
    }

    public Promo apprenants(Set<Apprenant> apprenants) {
        this.apprenants = apprenants;
        return this;
    }

    public Promo addApprenant(Apprenant apprenant) {
        this.apprenants.add(apprenant);
        apprenant.setPromo(this);
        return this;
    }

    public Promo removeApprenant(Apprenant apprenant) {
        this.apprenants.remove(apprenant);
        apprenant.setPromo(null);
        return this;
    }

    public void setApprenants(Set<Apprenant> apprenants) {
        this.apprenants = apprenants;
    }

    public Formation getFormation() {
        return formation;
    }

    public Promo formation(Formation formation) {
        this.formation = formation;
        return this;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Promo)) {
            return false;
        }
        return id != null && id.equals(((Promo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Promo{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }
}
