package com.mantrav2.gestiondessalarierv2.service;

import com.mantrav2.gestiondessalarierv2.exception.UserNotFoundException;
import com.mantrav2.gestiondessalarierv2.model.Skill;
import com.mantrav2.gestiondessalarierv2.repo.EmployeeRepo;
import com.mantrav2.gestiondessalarierv2.repo.SkillRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SkillService {

    private final SkillRepo skillRepo;

    private EmployeeRepo employeeRepo;

    @Autowired
    public SkillService(SkillRepo skillRepo) {
        this.skillRepo = skillRepo;
    }

    public Skill addSkill(Skill skill){
        skillRepo.save(skill);
        return skill;
    }

    public List<Skill> getSkill(){
        return skillRepo.findAll();
    }

    public void deleteSkill(Skill skill){
        skillRepo.delete(skill);
    }

    public void deleteSkillById (Long id){
        Skill skill = skillRepo.findById(id)
                .orElseThrow( () -> new UserNotFoundException("Skill with id :" + id + " is not found" ));
        this.deleteSkill(skill);
    }

/*    public void addSkillToEmployee(Long id, Set<Skill> skill){
        Optional<Employee> employeeTemp = employeeRepo.findById(id);
        if(employeeTemp!=null){
        }
    }*/
}
