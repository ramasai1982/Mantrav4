package com.mantrav2.gestiondessalarierv2.Resource;

import com.mantrav2.gestiondessalarierv2.model.Skill;
import com.mantrav2.gestiondessalarierv2.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/skill")
public class SkillResource {


    private final SkillService skillService;

    @Autowired
    public SkillResource(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping("/add")
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill){
        Skill skillAdd = skillService.addSkill(skill);
        return new ResponseEntity<>(skillAdd, HttpStatus.CREATED);
    }
    @GetMapping("/list")
    public ResponseEntity<List<Skill>> getSkill(){
        List<Skill> skillList = skillService.getSkill();
        return new ResponseEntity<>(skillList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable ("id") Long idC){
        skillService.deleteSkillById(idC);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
