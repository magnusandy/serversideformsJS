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
 return a function that determines the error message to use
 @param fieldDefault default error message for the type of field
 */
    protected determineErrorMessageForFieldFunc(fieldDefault: string): (userGiven?: string, functionDefined?: string) => Supplier<string> {
        return (userGiven?: string, functionDefined?: string) =>
            () => Optional.ofNullable(userGiven)
                .orElse(this.getDefaultErrorMessage()
                    .orElse(Optional.ofNullable(functionDefined)
                        .orElse(fieldDefault)));
    }
}