package com.mantrav2.gestiondessalarierv2.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;


@Getter
@ToString
@Entity
@NoArgsConstructor
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    @Setter
    private String employeeCode;
    @Setter
    private String civility;
    @Setter
    private String martialStatus;
    @Setter
    private String lastName;
    @Setter
    private String firstName;
    @Setter
    @Column(length=12)
    private Date dob;
    @Setter
    private String street;
    @Setter
    private String city;
    @Setter
    @Column(length=5)
    private String pinCode;
    @Setter
    private String phone;
    @Setter
    private String email;
    @Setter
    @Column(length=6)
    private Date startDate;
    @Setter
    private String positionType;
    @Setter
    @Column(length=6)
    private Date endDate;
    @Setter
    private String imageUrl;
    @Setter
    private String linkedIn;
    @Setter
    private String sex;
    @Setter
    private String jobTitle;
    @Setter
    private String hourlyPay;
    @Setter
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
