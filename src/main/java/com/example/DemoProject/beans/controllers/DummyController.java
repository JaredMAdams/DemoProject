package com.example.DemoProject.beans.controllers;

import com.example.DemoProject.beans.services.DummyService;
import com.example.DemoProject.entities.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dummy")
public class DummyController {

    private final DummyService dummyService;

    public DummyController(DummyService dummyService) {
        this.dummyService = dummyService;
    }

    @GetMapping
    public ResponseEntity<Employee> getDummyEmployee() {
        return ResponseEntity.ok(this.dummyService.getDummyEmployee());
    }
}
