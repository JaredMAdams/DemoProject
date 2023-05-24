package com.example.DemoProject.entities;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class Address {
    @Field("street_address")
    private String streetAddress;
    @Field("apt_number")
    private String aptNumber;
    @Field
    private String city;
    @Field
    private String state;
    @Field("zip_code")
    private int zipCode;

    public Address(String streetAddress, String aptNumber, String city, String state, int zipCode) {
        this.streetAddress = streetAddress;
        this.aptNumber = aptNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
