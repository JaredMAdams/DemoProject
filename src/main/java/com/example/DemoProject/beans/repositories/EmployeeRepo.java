package com.example.demoproject.beans.repositories;

import com.example.demoproject.entities.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepo extends MongoRepository<Employee, String> {

    //Queries a list of entities based on their state
    List<Employee> findByAddresses_State(String state);

    //Queries a list of entities based on their city
    List<Employee> findByAddresses_CityLike(String city);

    //Queries a list of entities based on their First Name
    List<Employee> findByFirstNameLike(String regexp);

    //Queries a list of entities based on their Last Name
    List<Employee> findByLastNameLike(String lastName);

    //Queries a list of entities based on their Zip code
    List<Employee> findByAddresses_ZipCodeLike(String zipCode);
}
