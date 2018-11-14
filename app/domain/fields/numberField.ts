import Validator from "../validators/validator";
import Field from "./field";
import ValidationResults from "../validators/validationResults";
import { Stream } from "java8script";

export class NumberField extends Field {
    private validators: Validator<number>[];
    private constructor(id: string, name: string, desc: string, validators: Validator<number>[]) {
        super(id, name, desc);
        this.validators = validators;
    }

    public static create(id: string, name: string, desc: string) {
        return new NumberField(id, name, desc, []);
    }

    public validate(input: any): ValidationResults[] {  
        if(!this.isRequired() && !input) { // field is not required and no input is given
            return [ValidationResults.success()];
        } else if (typeof input === "number") { //if the field is required, or an input is given, we need to validate it
            return Stream.of(this.validators)
                         .map(validator => validator.validate(input))
                         .toArray();
        } else {
            return [ValidationResults.error(`supplied input: ${input} is not a number!`)]
        }
    }

    public setFieldNotRequired(): NumberField {
        this.setRequired(false);
        return this;
    }

    public addCustomValidator(validator: Validator<number>): NumberField {
        this.validators.push(validator);
        return this;
    }

    public rangeClosed(lower: number, upper: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            (input >= lower) && (input <= upper)
        ));
    }

    public rangeOpen(lower: number, upper: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            (input > lower) && (input < upper)
        ));
    }

    public rangeClosedOpen(lower: number, upper: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            (input >= lower) && (input < upper)
        ));
    }

    public rangeOpenClosed(lower: number, upper: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            (input > lower) && (input <= upper)
        ));
    }

    public greaterThan(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input > value
        ));
    }

    public greaterThanEq(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input >= value
        ));
    }

    public lessThan(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input < value
        ));
    }

    public lessThanEq(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input <= value
        ));
    }
    
    public oneOf(validValues: number[], errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.oneOf(errorMessage, validValues));
    }
}