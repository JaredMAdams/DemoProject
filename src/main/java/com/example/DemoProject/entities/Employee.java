package com.example.DemoProject.entities;

import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(collection = "employees")
@Data
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Cacheable
public class Employee {

    @MongoId
    @Field("employee_id")
    private String employeeId;
    @Field("first_name")
    private String firstName;
    @Field("last_name")
    private String lastName;
    @Field
    private List<Address> addresses;

    public Employee(){}

    public Employee(String employeeId, String firstName, String lastName) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Employee(String employeeId, String firstName, String lastName, List<Address> addresses) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.addresses = addresses;
    }
}
