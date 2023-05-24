package com.example.DemoProject.beans.services;

import com.example.DemoProject.entities.Employee;
import org.springframework.stereotype.Service;

@Service
public class DummyService {

    public Employee getDummyEmployee() {
        Employee dummyEmployee = new Employee("abc123", "John", "Doe");
        return dummyEmployee;
    }
}
