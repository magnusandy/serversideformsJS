import Validator from "../validators/validator";
import Field from "./field";
import ValidationResults from "../validators/validationResults";
import { Stream, Predicate, Optional, Supplier } from "java8script";

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

    public addNotRequired(): NumberField {
        this.setRequired(false);
        return this;
    }

    public addDefaultErrorMessage(defaultErrorMessage: string): NumberField {
        this.setDefaultErrorMessage(Optional.of(defaultErrorMessage));
        return this;
    }

    public addCustomValidation(predicate: Predicate<number>, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, predicate));
    }

    public addRangeClosed(lower: number, upper: number): NumberField;
    public addRangeClosed(lower: number, upper: number, errorMessage: string): NumberField;
    public addRangeClosed(lower: number, upper: number, errorMessage?: string): NumberField {
        return this.addCustomValidator(Validator.create(
            this.determineErrorMessage(errorMessage, `input must be greater or equal to ${lower} and less or equal to ${upper}`), 
            (input: number) => (input >= lower) && (input <= upper)
        ));
    }

    public addRangeOpen(lower: number, upper: number): NumberField;
    public addRangeOpen(lower: number, upper: number, errorMessage: string): NumberField;
    public addRangeOpen(lower: number, upper: number, errorMessage?: string): NumberField {
        return this.addCustomValidator(Validator.create(
            this.determineErrorMessage(errorMessage, `input must be greater than ${lower} and less than ${upper}`), 
            (input: number) => (input > lower) && (input < upper)
        ));
    }

    public addRangeClosedOpen(lower: number, upper: number): NumberField;
    public addRangeClosedOpen(lower: number, upper: number, errorMessage: string): NumberField;
    public addRangeClosedOpen(lower: number, upper: number, errorMessage?: string): NumberField {
        return this.addCustomValidator(Validator.create(
            this.determineErrorMessage(errorMessage, `input must be greater or equal to ${lower} and less than ${upper}`), 
            (input: number) =>(input >= lower) && (input < upper)
        ));
    }

    public addRangeOpenClosed(lower: number, upper: number): NumberField;
    public addRangeOpenClosed(lower: number, upper: number, errorMessage: string): NumberField;
    public addRangeOpenClosed(lower: number, upper: number, errorMessage?: string): NumberField {
        return this.addCustomValidator(Validator.create(
            this.determineErrorMessage(errorMessage, "`input must be greater than ${lower} and less or equal to ${upper}`"), 
            (input: number) => (input > lower) && (input <= upper)
        ));
    }

    public addGreaterThan(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input > value
        ));
    }

    public addGreaterThanEq(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input >= value
        ));
    }

    public addLessThan(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input < value
        ));
    }

    public addLessThanEq(value: number, errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.create(errorMessage, (input: number) =>
            input <= value
        ));
    }
    
    public addOneOf(validValues: number[], errorMessage: string): NumberField {
        return this.addCustomValidator(Validator.oneOf(errorMessage, validValues));
    }

    private addCustomValidator(validator: Validator<number>): NumberField {
        this.validators.push(validator);
        return this;
    }

    private determineErrorMessage: (userGiven?: string, functionDefined?: string) => Supplier<string> = 
        this.determineErrorMessageForField("The given input number is invalid");
}