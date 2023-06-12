package com.example.DemoProject.beans.controllers;

import com.example.DemoProject.beans.services.EmployeeService;
import com.example.DemoProject.entities.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/{objectId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String objectId) {
        Optional<Employee> employeeOptional = this.employeeService.getEmployeeById(objectId);
        try {
            employeeOptional.isPresent();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(employeeOptional.get());
    }

    @GetMapping("/state/{state}")
    public ResponseEntity<List<Employee>> getEmployeesByState(@PathVariable String state) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByState(state));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Employee>> getEmployeesByCity(@PathVariable String city) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByCity(city));
    }

    @GetMapping("/zip-code/{zipCode}")
    public ResponseEntity<List<Employee>> getEmployeesByZipCode(@PathVariable String zipCode) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByZipCode(zipCode));
    }

    @GetMapping("/first-name/{firstName}")
    public ResponseEntity<List<Employee>> getEmployeesByFirstName(@PathVariable String firstName) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByFirstName(firstName));
    }

    @GetMapping("/last-name/{lastName}")
    public ResponseEntity<List<Employee>> getEmployeesByLastName(@PathVariable String lastName) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByLastName(lastName));
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllUsers() {
        return ResponseEntity.ok(this.employeeService.getAllEmployees());
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.employeeService.createEmployee(employee));
    }

    @PostMapping("/executor")
    public ResponseEntity<List<Employee>> createMultipleEmployees(@RequestBody List<Employee> employees) {
        CompletableFuture<List<Employee>> employees1 = employeeService.createMultipleEmployees(employees);
        employees1.join();
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{objectId}")
    public void deleteEmployee(@PathVariable String objectId) {
        this.employeeService.deleteEmployee(objectId);
    }
}
