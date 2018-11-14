import { expect } from "chai";
import ValidationResults from "../../../app/domain/validators/validationResults";
import Validator from "../../../app/domain/validators/validator";

describe('Validator Tests', () => {
    describe('Validator.oneOf', () => {
        it('creates a validator that matches against the given list, success if in list', () => {
            const errorMessage: string = "errorMessage";
            const input: number = 1;
            const listMatcher: number[] = [input,2,3];
            const validator: Validator<number> = Validator.oneOf(errorMessage, listMatcher);
            const results: ValidationResults = validator.validate(input)   
            expect(results.isValid()).to.be.true;
            expect(results.getMessage().isPresent()).to.be.false;
        });

        it('creates a validator that matches against the given list, fail if in list', () => {
            const errorMessage: string = "errorMessage";
            const input: number = 4;
            const listMatcher: number[] = [1,2,3];
            const validator: Validator<number> = Validator.oneOf(errorMessage, listMatcher);
            const results: ValidationResults = validator.validate(input)   
            expect(results.isValid()).to.be.false;
            expect(results.getMessage().get()).to.be.eq(errorMessage);
        });
    });

    describe('Validator.create', () => {
        it('validator returns successful results if predicate returns true', () => {
            const errorMessage: string = "errorMessage";
            const validator: Validator<number> = Validator.create(errorMessage, (n: number) => true);
            const results: ValidationResults = validator.validate(1)   
            expect(results.isValid()).to.be.true;
            expect(results.getMessage().isPresent()).to.be.false;
        });

        it('validator returns failed results if predicate returns false', () => {
            const errorMessage: string = "errorMessage";
            const validator: Validator<number> = Validator.create(errorMessage, (n: number) => false);
            const results: ValidationResults = validator.validate(1)   
            expect(results.isValid()).to.be.false;
            expect(results.getMessage().get()).to.be.eq(errorMessage);
        });
    });
});