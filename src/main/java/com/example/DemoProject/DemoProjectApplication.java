package com.example.DemoProject;

import com.example.DemoProject.beans.services.EmployeeService;
import com.example.DemoProject.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.util.List;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class DemoProjectApplication implements CommandLineRunner {

	private final EmployeeService employeeService;

	@Autowired
	public DemoProjectApplication(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoProjectApplication.class, args);
	}

	//Creating a dummy employee and returning a list of details from service.
	//Iterating over the list of details and display them in the console.
	@Override
	public void run(String... args) throws Exception {
		Employee dummyEmployee = new Employee("abc123", "John", "Doe");
		List<String> details = employeeService.dummyEmployee(dummyEmployee);
		details.forEach(System.out::println);
	}
}