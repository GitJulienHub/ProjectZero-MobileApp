import {FormControl} from "@angular/forms";

export function isEmailValid(control: FormControl): {[s: string]: boolean} {
    if (control.value != null && !control.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      return {'emailInvalid': true}
    }

    return null;
}


