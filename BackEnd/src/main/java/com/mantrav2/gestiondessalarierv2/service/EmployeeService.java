package com.mantrav2.gestiondessalarierv2.service;

import com.mantrav2.gestiondessalarierv2.exception.UserNotFoundException;
import com.mantrav2.gestiondessalarierv2.model.Employee;
import com.mantrav2.gestiondessalarierv2.model.Skill;
import com.mantrav2.gestiondessalarierv2.repo.EmployeeRepo;
import com.mantrav2.gestiondessalarierv2.repo.SkillRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    private SkillRepo skillRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee){
        employee.setEmployeeCode(UUID.randomUUID().toString());
        employeeRepo.save(employee);
        return employee;
    }

    public Employee editEmployee(Employee employee){
        employeeRepo.save(employee);
        return employee;
    }

    public void deleteEmployee(Employee employee){
        employeeRepo.delete(employee);
    }

    public List<Employee> getEmployee(){
        return employeeRepo.findAll();
    }

    public Employee findEmployeeByName(String name){
        return employeeRepo.findEmployeeByLastName(name)
                .orElseThrow(() -> new UserNotFoundException("User name: " + name +  " not found"));
    }

    public void deleteEmployeeById(Long id){
        Employee employeeFind = employeeRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User id " + id + " is not found" ));
        this.deleteEmployee(employeeFind);
    }

    public Employee addSkillToEmployee(Employee skillEmployee){
        Set<Skill> skill = skillEmployee.getSkill();
        skillEmployee.setSkill(skill);
        employeeRepo.save(skillEmployee);
        return skillEmployee;
    }

}
