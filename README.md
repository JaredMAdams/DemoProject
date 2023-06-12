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

