import { Predicate, Stream } from "java8script";
import ValidationResults from "./validationResults";

/**
 * A Validator wraps a predicate and an error message, and returns a ValidationResults
 * based on the validation of a given input.
 */
export default class Validator<T> {
    private validatorFunction: Predicate<T>;
    private errorMessage: string;

    private constructor(errorMessage: string, validatorFunction: Predicate<T>) {
        this.validatorFunction = validatorFunction;
        this.errorMessage = errorMessage;
    }

    public static create<T>(errorMessage: string, validatorFunction: Predicate<T>): Validator<T> {
        return new Validator(errorMessage, validatorFunction);
    }

    public validate(input: T): ValidationResults {
        return this.validatorFunction(input)
            ? ValidationResults.success()
            : ValidationResults.error(this.errorMessage);
    }

    public static oneOf<T>(errorMessage: string, validValues: T[]): Validator<T> {
        return Validator.create(errorMessage, (input: T) =>
            Stream.of(validValues).anyMatch(validValue => validValue === input)
        );
    }
}