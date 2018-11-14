import { Optional } from "java8script";

/**
 * encapsulates the results of a single validation
 * the state of the validation as well as a errorMessage (if any)
 */
export default class ValidationResults {
    private valid: boolean;
    private message: Optional<string>;

    private constructor(valid: boolean, message: Optional<string>) {
        this.valid = valid;
        this.message = message;
    }

    public static success(): ValidationResults {
        return new ValidationResults(true, Optional.empty());
    }

    public static error(message: string): ValidationResults {
        return new ValidationResults(false, Optional.of(message));
    }

    public isValid(): boolean {
        return this.valid;
    }

    public getMessage(): Optional<string> {
        return this.message;
    }
}