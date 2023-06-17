package com.example.demoproject.beans.controllers;

import com.example.demoproject.beans.services.DummyService;
import com.example.demoproject.entities.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
@RestController
@RequestMapping("/dummy")
public class DummyController {

    @Inject
    private DummyService dummyService;
    @GetMapping
    public ResponseEntity<Employee> getDummyEmployee() {
        return ResponseEntity.ok(this.dummyService.getDummyEmployee());
    }
}
