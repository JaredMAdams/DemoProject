package com.example.demoproject.beans.services;

import com.example.demoproject.beans.repositories.EmployeeRepo;
import com.example.demoproject.entities.Address;
import com.example.demoproject.entities.Employee;
import com.example.demoproject.exceptions.InvalidStateException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepo employeeRepo;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee employee;

    private List<Employee> employees;

    private List<Address> addresses;

    @BeforeEach
    void setUp() {
        employeeRepo = Mockito.mock(EmployeeRepo.class);
        employeeService = new EmployeeService();
        addresses = Arrays.asList(
                new Address("22", "33", "Austin", "Texas", "55555"),
                new Address("11", "44", "Queens", "New York", "55555")
        );
        employee = new Employee("1", "John", "Doe", addresses);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void givenEmployeeId_whenGetEmployee_thenReturnEmployee() {
        given(employeeRepo.findById("1"))
                .willReturn(Optional.of(employee));

        Employee savedEmployee = employeeService.getEmployeeById(employee.getEmployeeId()).get();

        assertThat(savedEmployee).isNotNull();
    }

    @Test
    void givenEmployeeObject_whenCreateEmployee_thenReturnEmployeeObject() {
        given(employeeService.createEmployee(employee)).willReturn(employee);

        Employee createdEmployee = employeeService.createEmployee(employee);

        System.out.println(createdEmployee);

        assertThat(createdEmployee).isNotNull();
    }

    @Test
    void givenEmployeeObject_whenCreateEmployee_thenThrowInvalidStateException() {
        given(employeeService.createEmployee(employee)).willReturn(employee);

        assertThrows(InvalidStateException.class,
                () -> employeeService.createEmployee(employee));
    }

    @Test
    void givenEmployeeId_whenDeleteEmployee_thenNothing() {
        String employeeId = "1";

        willDoNothing().given(employeeRepo).deleteById(employeeId);

        employeeService.deleteEmployee(employeeId);

        verify(employeeRepo, times(1)).deleteById(employeeId);
    }
}