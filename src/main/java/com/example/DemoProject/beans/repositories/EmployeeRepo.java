package com.example.demoproject.beans.repositories;

import com.example.demoproject.entities.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepo extends MongoRepository<Employee, String> {

    //Queries a list of entities based on their state
    @Query("{'addresses.state' : ?0}")
    List<Employee> findByAddresses_State(String state);

    //Queries a list of entities based on their city
    @Query("{'addresses.city' : ?0}")
    List<Employee> findByAddresses_City(String city);

    //Queries a list of entities based on their First Name
    @Query("{firstName : ?0}")
    List<Employee> findByFirstName(String firstName);

    //Queries a list of entities based on their Last Name
    @Query("{lastName : ?0}")
    List<Employee> findByLastName(String lastName);

    //Queries a list of entities based on their Zip code
    @Query("{'addresses.zip_code' : ?0}")
    List<Employee> findByAddresses_ZipCode(String zipCode);
}
