import { expect } from "chai";
import Form from "../../app/domain/form";
import { NumberField } from "../../app/domain/fields/numberField";


describe('Form Tests', () => {
    describe('Form', () => {
        const form: Form = Form.create()
        .addField(NumberField.create("1", "2", "3")
                    .addLessThan(10, "bad"))
    });
});