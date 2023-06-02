package com.example.DemoProject.entities;

import lombok.Data;
import org.bson.types.ObjectId;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "addresses")
@Data
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Cacheable
public class Address {

    @MongoId
    @Field("address_id")
    private String addressId;
    @Field("street_address")
    private String streetAddress;
    @Field("apt_number")
    private String aptNumber;
    @Field
    private String city;
    @Field
    private String state;
    @Field("zip_code")
    private String zipCode;

    public Address(String streetAddress, String aptNumber, String city, String state, String zipCode) {
        this.streetAddress = streetAddress;
        this.aptNumber = aptNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
