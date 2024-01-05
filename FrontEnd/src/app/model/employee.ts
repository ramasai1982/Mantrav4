import { Skill } from "./skill";

export interface Employee {
    id?: number;
    civility: string;
    lastName: string;
    firstName: string;
    email: string;
    employeeCode?: string;
    jobTitle: string;
    phone: string;
    dob: string;
    imageUrl: string;
    linkedIn: string;
    sex: string;
    skill: Array<Skill>;
}