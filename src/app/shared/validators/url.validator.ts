import { AbstractControl } from '@angular/forms';

export function validatorUrl(control: AbstractControl) {

  const reg = new RegExp(
    '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
  );
  if (!reg.test(control.value)) {
    return { invalidUrl: true };
  }
  return null;
}
