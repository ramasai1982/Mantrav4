package com.mantrav2.gestiondessalarierv2.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(nullable = false)

    private String employeeCode;

    private String civility;

    private String martialStatus;

    private String lastName;

    private String firstName;

    @Column(length=12)
    private Date dob;

    private String street;

    private String city;

    @Column(length=5)
    private String pinCode;

    private String phone;

    private String email;

    @Column(length=6)
    private Date startDate;

    private String positionType;

    @Column(length=6)
    private Date endDate;

    private String imageUrl;

    private String linkedIn;

    private String sex;

    private String jobTitle;

    private String hourlyPay;

    @ManyToMany(fetch=FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinTable(name="ec_table",
            joinColumns = @JoinColumn(name="id_fk"),
            inverseJoinColumns = @JoinColumn(name = "idc_fk")
    )
    private Set<Skill> skill ;


    public Employee(String civility, String martialStatus, String lastName, String firstName, Date dob, String street, String city, String pinCode, String phone, String email, Date startDate, String positionType, Date endDate, String imageUrl, String linkedIn, String sex, String jobTitle, String hourlyPay, Set<Skill> skill) {
        this.civility = civility;
        this.martialStatus = martialStatus;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.street = street;
        this.city = city;
        this.pinCode = pinCode;
        this.phone = phone;
        this.email = email;
        this.startDate = startDate;
        this.positionType = positionType;
        this.endDate = endDate;
        this.imageUrl = imageUrl;
        this.linkedIn = linkedIn;
        this.sex = sex;
        this.jobTitle = jobTitle;
        this.hourlyPay = hourlyPay;
        this.skill = skill;
    }
}
