import { AbstractControl, ValidatorFn } from "@angular/forms";


export function EmailValidator() : ValidatorFn
{
    
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        
        if(control.value.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))
        {
            return {'EmailNotValid': true};
        }
        return null;
    }

}
