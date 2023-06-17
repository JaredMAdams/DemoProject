package com.example.demoproject.beans.services;

import com.example.demoproject.beans.repositories.EmployeeRepo;
import com.example.demoproject.entities.Employee;
import com.example.demoproject.exceptions.InvalidStateException;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.*;
import java.util.concurrent.*;

@Service
public class EmployeeService {
    @Inject
    private EmployeeRepo employeeRepo;
    Map<String, String> states = new HashMap<String, String>();

    //Establishes map used to convert state to state 2 character code
    public EmployeeService() {
        states.put("Alabama","AL");
        states.put("AL","AL");
        states.put("Alaska","AK");
        states.put("AK","AK");
        states.put("Alberta","AB");
        states.put("AB","AB");
        states.put("American Samoa","AS");
        states.put("AS","AS");
        states.put("Arizona","AZ");
        states.put("AZ","AZ");
        states.put("Arkansas","AR");
        states.put("AR","AR");
        states.put("Armed Forces (AE)","AE");
        states.put("AE","AE");
        states.put("Armed Forces Americas","AA");
        states.put("AA","AA");
        states.put("Armed Forces Pacific","AP");
        states.put("AP","AP");
        states.put("British Columbia","BC");
        states.put("BC","BC");
        states.put("California","CA");
        states.put("CA","CA");
        states.put("Colorado","CO");
        states.put("CO","CO");
        states.put("Connecticut","CT");
        states.put("Georgia","GA");
        states.put("Guam","GU");
        states.put("Hawaii","HI");
        states.put("Idaho","ID");
        states.put("Illinois","IL");
        states.put("Indiana","IN");
        states.put("Iowa","IA");
        states.put("Kansas","KS");
        states.put("Kentucky","KY");
        states.put("Louisiana","LA");
        states.put("Maine","ME");
        states.put("Manitoba","MB");
        states.put("Maryland","MD");
        states.put("Massachusetts","MA");
        states.put("Michigan","MI");
        states.put("Minnesota","MN");
        states.put("Mississippi","MS");
        states.put("Missouri","MO");
        states.put("Montana","MT");
        states.put("Nebraska","NE");
        states.put("Nevada","NV");
        states.put("New Brunswick","NB");
        states.put("New Hampshire","NH");
        states.put("New Jersey","NJ");
        states.put("New Mexico","NM");
        states.put("New York","NY");
        states.put("Newfoundland","NF");
        states.put("North Carolina","NC");
        states.put("North Dakota","ND");
        states.put("Northwest Territories","NT");
        states.put("Nova Scotia","NS");
        states.put("Nunavut","NU");
        states.put("Ohio","OH");
        states.put("Oklahoma","OK");
        states.put("Ontario","ON");
        states.put("Oregon","OR");
        states.put("Pennsylvania","PA");
        states.put("Prince Edward Island","PE");
        states.put("Puerto Rico","PR");
        states.put("Quebec","QC");
        states.put("Rhode Island","RI");
        states.put("Saskatchewan","SK");
        states.put("South Carolina","SC");
        states.put("South Dakota","SD");
        states.put("Tennessee","TN");
        states.put("Texas","TX");
        states.put("Utah","UT");
        states.put("Vermont","VT");
        states.put("Virgin Islands","VI");
        states.put("Virginia","VA");
        states.put("Washington","WA");
        states.put("West Virginia","WV");
        states.put("Wisconsin","WI");
        states.put("Wyoming","WY");
        states.put("Yukon Territory","YT");
        states.put("CT","CT");
        states.put("DE","DE");
        states.put("DC","DC");
        states.put("FL","FL");
        states.put("GA","GA");
        states.put("GU","GU");
        states.put("HI","HI");
        states.put("ID","ID");
        states.put("IL","IL");
        states.put("IN","IN");
        states.put("IA","IA");
        states.put("KD","KS");
        states.put("KY","KY");
        states.put("LA","LA");
        states.put("ME","ME");
        states.put("MB","MB");
        states.put("MD","MD");
        states.put("MA","MA");
        states.put("MI","MI");
        states.put("MN","MN");
        states.put("MS","MS");
        states.put("MO","MO");
        states.put("MT","MT");
        states.put("NE","NE");
        states.put("NV","NV");
        states.put("NB","NB");
        states.put("NH","NH");
        states.put("NJ","NJ");
        states.put("NM","NM");
        states.put("NY","NY");
        states.put("NF","NF");
        states.put("NC","NC");
        states.put("ND","ND");
        states.put("NT","NT");
        states.put("NS","NS");
        states.put("NU","NU");
        states.put("OH","OH");
        states.put("OK","OK");
        states.put("ON","ON");
        states.put("OR","OR");
        states.put("PA","PA");
        states.put("PE","PE");
        states.put("PR","PR");
        states.put("QC","QC");
        states.put("RI","RI");
        states.put("SK","SK");
        states.put("SC","SC");
        states.put("SD","SD");
        states.put("TN","TN");
        states.put("TX","TX");
        states.put("UT","UT");
        states.put("VT","VT");
        states.put("VI","VI");
        states.put("VA","VA");
        states.put("WA","WA");
        states.put("WV","WV");
        states.put("WI","WI");
        states.put("WY","WY");
        states.put("YT","YT");
        states.put("", null);
        states.put(null, null);
    }

    //Extracting details of dummy employee and adding them to a list to be returned.
    public List<String> dummyEmployee(Employee employee) {
        List<String> employeeDetails = new LinkedList<>();
        employeeDetails.add(employee.getEmployeeId());
        employeeDetails.add(employee.getFirstName());
        employeeDetails.add(employee.getLastName());

        return employeeDetails;
    }

    //EmployeeID# is cached upon searching.
    //If EmployeeId is not currently in cache, saves employeeId and then pulls info from DB
    @Cacheable(cacheNames = "employeeId", key = "#employeeId")
    public Optional<Employee> getEmployeeById(String employeeId) {
        return this.employeeRepo.findById(employeeId);
    }

    //Calls the "findByAddresses_State" method in order to return a list of employees belonging to a specific state
    public List<Employee> getEmployeesByState(String state) {
        return this.employeeRepo.findByAddresses_State(states.get(state));
    }

    //Calls the "findByAddresses_City" method in order to return a list of employees belonging to a specific city
    public List<Employee> getEmployeesByCity(String city) {
        return this.employeeRepo.findByAddresses_CityLike(city);
    }

    //Calls the "findByAddresses_ZipCode" method in order to return a list of employees belonging to a specific zip code
    public List<Employee> getEmployeesByZipCode(String zipCode) {
        return this.employeeRepo.findByAddresses_ZipCodeLike(zipCode);
    }

    //@Cacheable(cacheNames = "employeeFirstName", cacheManager = "alternateCacheManager") - commented out as a result of not working while ehCache is active
    //Calls the "findByFirstName" method in order to return a list of employees having a specific first name
    public List<Employee> getEmployeesByFirstName(String firstName) {
        return this.employeeRepo.findByFirstNameLike(firstName);
    }

    //Calls the "findByLastName" method in order to return a list of employees having a specific last name
    public List<Employee> getEmployeesByLastName(String lastName) {
        return this.employeeRepo.findByLastNameLike(lastName);
    }

    public List<Employee> getAllEmployees() {
        return this.employeeRepo.findAll();
    }
    //@CachePut(cacheNames = "employeeFirstName", cacheManager = "alternateCacheManager") - commented out as a result of not working while ehCache is active
    //Uses the build in "save" method to create a new employee
    public Employee createEmployee(Employee employee) throws InvalidStateException {

        convertStateToCode(employee);
        return this.employeeRepo.save(employee);
    }

    //Method used to create multiple employees from a single submission
    @Async
    public Future createMultipleEmployees(List<Employee> employees) throws ExecutionException, InterruptedException {
        //Creates new executor service, and sets thread pool size to 2.
        ExecutorService executorService = Executors.newFixedThreadPool(2);

        //This callable loops through the list of employees sent by the user, and calls the "save" method on each of them
        Callable<List<Employee>> callable = () -> {
            for(Employee employee : employees) {
                convertStateToCode(employee);
                this.employeeRepo.save(employee);
            }
            return null;
        };

        //Uses the executor service to execute the callable above, returning a future.
        Future<List<Employee>> future = executorService.submit(callable);

        //Waits until future is complete, then returns the result
        future.get();

        return future;
    }

    public void deleteEmployee(String objectId) {
        this.employeeRepo.deleteById(objectId);
    }

    //Check if user input their state as its full name.
    //If they did, it converts the state into its 2-digit code.
    //If the state does not exist, an InvalidStateException is thrown, telling the user to please enter a valid state.
    private void convertStateToCode(Employee employee) {
        employee.getAddresses().forEach((address) -> states.entrySet()
                .stream()
                .filter(e -> address.getState().equalsIgnoreCase(e.getKey()))
                .findFirst()
                .ifPresentOrElse(
                        (key) -> address.setState(key.getValue()),
                        () -> {
                            throw new InvalidStateException("Please Enter a Valid State");
                        }
                )
        );
    }
}