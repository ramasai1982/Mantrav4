package com.mantrav2.gestiondessalarierv2.Resource;


import com.mantrav2.gestiondessalarierv2.model.Employee;
import com.mantrav2.gestiondessalarierv2.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeResource {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeResource(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee){
        Employee employeeAdd = employeeService.addEmployee(employee);
        return new ResponseEntity<>(employeeAdd, HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<Employee> editEmployee(@RequestBody Employee employee){
        Employee employeeEdit = employeeService.editEmployee(employee);
        return new ResponseEntity<>(employeeEdit, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getEmployee(){
        List<Employee> employee = employeeService.getEmployee();
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable ("id") Long id){
        employeeService.deleteEmployeeById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
