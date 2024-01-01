package com.mantrav2.gestiondessalarierv2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Set;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "skill_table")
public class Skill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="idc")
    private Long idC;
    @Column(name = "comp")
    private String comp;

    @ManyToMany(fetch=FetchType.LAZY,mappedBy = "skill")
    @JsonBackReference
    private Set<Employee> employees;

    public Skill(Long idC, String comp) {
        this.idC = idC;
        this.comp = comp;
    }
}
