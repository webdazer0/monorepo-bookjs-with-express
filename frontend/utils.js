const regexString = new RegExp("[a-zA-Z]");
const regexNumber = new RegExp("[0-9]");

export class Validator {
  static string(input) {
    return Validator.default(input, regexString);
  }

  static number(input) {
    return Validator.default(input, regexNumber);
  }

  static default(input, regex) {
    const isNotValid = input.value == null || !regex.test(input.value);
    if (isNotValid) throw Error(`The field [${input.id}] is not Valid!`);

    return input.value;
  }
}
