import { Optional, Stream, Supplier } from "java8script";
import { BasicFieldElements } from "../basicElements";
import ValidationResults from "../validators/validationResults";

/**
 * a field is the building block of a form, it contains all the information necessary to validate an input.
 * By default, all fields are required and the default error message is "";
 */
export default abstract class Field extends BasicFieldElements {
    protected constructor(id: string, name: string, description: string) {
        super(id, name, description, true, Optional.empty());
    }

    abstract validate(input: any): ValidationResults[];
    public isValid(input: any): boolean {
        return Stream.of(this.validate(input))
            .allMatch(results => results.isValid())
    }

    /**
 * Determines the correct errorMessage to use, first taking the user supplied message,
 * then the user supplied global defaultdefault, or the function defined deault (if given) finally returning "Failed to validate number" if all else fails.
 * @param userGiven
 */
    protected determineErrorMessageForField(fieldDefault: string): (userGiven?: string, functionDefined?: string) => Supplier<string> {
        return (userGiven?: string, functionDefined?: string) =>
            () => Optional.ofNullable(userGiven)
                .orElse(this.getDefaultErrorMessage()
                    .orElse(Optional.ofNullable(functionDefined)
                        .orElse(fieldDefault)));
    }
}