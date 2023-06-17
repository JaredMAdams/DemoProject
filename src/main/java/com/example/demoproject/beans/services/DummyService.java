package com.example.demoproject.beans.services;

import com.example.demoproject.entities.Employee;
import org.springframework.stereotype.Service;

@Service
public class DummyService {
    public Employee getDummyEmployee() {
        return new Employee("abc123", "John", "Doe");
    }
}
