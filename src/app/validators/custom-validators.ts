import { AbstractControl } from "@angular/forms";

export class CustomValidators {

    static startWithNumber(control: AbstractControl) {
        if (control.value.charAt(0) !== '' && !isNaN(control.value.charAt(0))) {
            return { startWithNumber: true }
        }
        return null
    }
    static unRelevantYear(control: AbstractControl) {
        const year = parseInt(control.value, 10)
        if (isNaN(year) || year < 1900 || year > 2023) {
            return { unRelevantYear: true };
        }
        return null;
    }
    

    static nameTaken(control: AbstractControl) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (control.value === 'bobby') {
                    resolve({ nameTaken: true })
                } else {
                    resolve(null)
                }
            }, 1000);
        })
    }

}


