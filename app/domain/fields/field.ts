import { Optional, Predicate, Stream } from "java8script";
import {BasicFieldElements} from "../basicElements";
import Validator from "../validators/validator";
import ValidationResults from "../validators/validationResults";

/**
 * a field is the building block of a form, it contains all the information necessary to validate an input
 */
export default abstract class Field extends BasicFieldElements {
    protected constructor(id: string, name: string, description: string) {
        super(id, name, description, true);
    }

    abstract validate(input: any): ValidationResults[];
    public isValid(input: any): boolean {
        return Stream.of(this.validate(input))
                     .allMatch(results => results.isValid())
    }
}