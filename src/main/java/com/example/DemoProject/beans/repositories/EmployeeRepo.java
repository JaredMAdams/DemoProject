package com.example.DemoProject.beans.repositories;

import com.example.DemoProject.entities.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepo extends MongoRepository<Employee, String> {

    @Query("{'addresses.state' : ?0}")
    List<Employee> findByAddresses_State(String state);

    @Query("{'addresses.city' : ?0}")
    List<Employee> findByAddresses_City(String city);

    @Query("{firstName : ?0}")
    List<Employee> findByFirstName(String firstName);

    @Query("{lastName : ?0}")
    List<Employee> findByLastName(String lastName);

    @Query("{'addresses.zip_code' : ?0}")
    List<Employee> findByAddresses_ZipCode(Integer zipCode);
}
