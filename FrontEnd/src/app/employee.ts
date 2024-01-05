import { Skill } from "./skill/skill";

export interface Employee {
    id: number;
    civility: string;
    lastName: string;
    firstName: string;
    email: string;
    employeeCode: string;
    jobTitle: string;
    phone: string;
    dob:Date;
    imageUrl: string;
    linkedIn: string;
    sex: string;
    skill: Array<Skill>;
}