import { Optional, Stream } from "java8script";
import {BasicFieldElements} from "../basicElements";
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
}