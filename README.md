# DemoProject

Sample project to create an application which will carry out CRUD operations on employee and their addresses. 


1. Update the spring boot version to 3.1.0
2. Remove few version specifications in pom.xml. No need to override or duplicate the managed version. 
3. Package name should be in lower case. Rename DemoProject to demoproject.
4. Remove unused imports
5. Add comments in all the methods
6. Immediately return the expression instead of assigning it to the temporary variable. 
	Ex - No need of temp variable "dummyEmployee".
	public Employee getDummyEmployee() {
        Employee dummyEmployee = new Employee("abc123", "John", "Doe");
        return dummyEmployee;
    }
    // Change it as below 
    public Employee getDummyEmployee() {
        return new Employee("abc123", "John", "Doe");
    }
7. Use the javax.inject.Inject annotation to inject managed beans. 
	Ex: 
    private final DummyService dummyService;

    public DummyController(DummyService dummyService) {
        this.dummyService = dummyService;
    }
    // Change it as below
    @Inject
    private DummyService dummyService;
8. Move all the logic from Controller to Service
9. Add Getters and Setters instead of lombok

06/16/2023
1. Change search by everyone to search by all
2. There should be a cancel option in all the pop up windows.
3. Add New Employee. What is the functionality of "+Employee" button?
4. As soon as you save an employee. Refresh the list
5. Search should be a like or contains search. Currently search for zip code, state and city is failing
6. Create an enum for states and use it

06/22/2023

1. Unable to build using mvn clean install. Following is the error. 

[INFO] 
[INFO] Results:
[INFO] 
[ERROR] Errors: 
[ERROR]   EmployeeServiceTest.givenEmployeeId_whenDeleteEmployee_thenNothing:93 » NullPointer Cannot invoke "com.example.demoproject.beans.repositories.EmployeeRepo.deleteById(Object)" because "this.employeeRepo" is null
[ERROR]   EmployeeServiceTest.givenEmployeeId_whenGetEmployee_thenReturnEmployee:63 » NullPointer Cannot invoke "com.example.demoproject.beans.repositories.EmployeeRepo.findById(Object)" because "this.employeeRepo" is null
[ERROR]   EmployeeServiceTest.givenEmployeeObject_whenCreateEmployee_thenReturnEmployeeObject:70 » NullPointer Cannot invoke "com.example.demoproject.beans.repositories.EmployeeRepo.save(Object)" because "this.employeeRepo" is null
[ERROR]   EmployeeServiceTest.givenEmployeeObject_whenCreateEmployee_thenThrowInvalidStateException:81 » NullPointer Cannot invoke "com.example.demoproject.beans.repositories.EmployeeRepo.save(Object)" because "this.employeeRepo" is null
[INFO] 
[ERROR] Tests run: 5, Failures: 0, Errors: 4, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  7.964 s
[INFO] Finished at: 2023-06-22T13:43:42-07:00
[INFO] ------------------------------------------------------------------------


