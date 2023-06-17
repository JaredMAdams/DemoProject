package com.example.demoproject.beans.controllers;

import com.example.demoproject.beans.services.EmployeeService;
import com.example.demoproject.entities.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class EmployeeController {

    @Inject
    private EmployeeService employeeService;

    //Gets Employee object based on the given ID of that employee
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

    //Gets a list of employees based on the state parameter, given by the user
    @GetMapping("/state/{state}")
    public ResponseEntity<List<Employee>> getEmployeesByState(@PathVariable String state) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByState(state));
    }

    ////Gets a list of employees based on the city parameter, given by the user
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Employee>> getEmployeesByCity(@PathVariable String city) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByCity(city));
    }

    //Gets a list of employees based on the zipcode parameter, given by the user
    @GetMapping("/zip-code/{zipCode}")
    public ResponseEntity<List<Employee>> getEmployeesByZipCode(@PathVariable String zipCode) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByZipCode(zipCode));
    }

    //Gets a list of employees based on the first name parameter, given by the user
    @GetMapping("/first-name/{firstName}")
    public ResponseEntity<List<Employee>> getEmployeesByFirstName(@PathVariable String firstName) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByFirstName(firstName));
    }

    //Gets a list of employees based on the last name parameter, given by the user
    @GetMapping("/last-name/{lastName}")
    public ResponseEntity<List<Employee>> getEmployeesByLastName(@PathVariable String lastName) {
        return ResponseEntity.ok(this.employeeService.getEmployeesByLastName(lastName));
    }

    //Gets a list of all users
    @GetMapping
    public ResponseEntity<List<Employee>> getAllUsers() {
        return ResponseEntity.ok(this.employeeService.getAllEmployees());
    }

    //Creates a user.  All info is sent in a request body, provided by the user
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.employeeService.createEmployee(employee));
    }

    //Post Request to create multiple employees from a single request
    @PostMapping("/executor")
    public Future createMultipleEmployees(@RequestBody List<Employee> employees) throws ExecutionException, InterruptedException {
        return this.employeeService.createMultipleEmployees(employees);
    }

    //Deletes an entity based on its objectId
    @DeleteMapping("/{objectId}")
    public void deleteEmployee(@PathVariable String objectId) {
        this.employeeService.deleteEmployee(objectId);
    }
}
