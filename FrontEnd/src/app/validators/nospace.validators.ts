import { AbstractControl, ValidatorFn } from "@angular/forms";


export function NoSpaceValidator() : ValidatorFn
{
    
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        
        if(control.value.trim()===" ")
        {
            return {'SpaceNotAllowed': true};
        }
        return null;
    }

}