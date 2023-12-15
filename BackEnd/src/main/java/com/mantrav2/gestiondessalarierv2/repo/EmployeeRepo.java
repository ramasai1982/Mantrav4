package com.mantrav2.gestiondessalarierv2.repo;

import com.mantrav2.gestiondessalarierv2.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    Optional<Employee> findEmployeeByLastName(String name);
}
