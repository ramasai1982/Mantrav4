package com.mantrav2.gestiondessalarierv2.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Getter
@ToString
@Entity
@NoArgsConstructor
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Setter
    @Column(nullable = false)
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
    private String dob;
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
    private String startDate;
    @Setter
    private String positionType;
    @Setter
    @Column(length=6)
    private String endDate;
    @Setter
    private String imageUrl;
    @Setter
    private String linkedIn;
    @Setter
    private String sex;
    @Setter
    private String jobTitle;

    public Employee(String civility, String martialStatus, String lastName, String firstName, String dob, String street, String city, String pinCode, String phone, String email, String startDate, String positionType, String endDate, String imageUrl, String linkedIn, String sex, String jobTitle) {
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
    }
}
