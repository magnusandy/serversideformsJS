import Field from "./fields/field";
import { Map } from "java8script";
import uuid from "uuid/v1";
import {BasicFormElements} from "./basicElements";

/**
 * A form is a collection of fields, 
 * a form can be serialized into json format or validated against a json input
 */
export default class Form  extends BasicFormElements {
    private fields: Map<string, Field>;

    private constructor(id: string, name: string, description: string, fields: Map<string, Field>) {
        super(id, name, description);    
        this.fields = fields;
    }

    /**
     * generates a new form with a new uuid, name and description are blank
     */
    public static create(): Form;
    /**
     * creates a new form with the supplied id
     * @param id 
     */
    public static create(id: string): Form;
    /**
     * creates a new form with the give name and id;
     * @param id 
     * @param name 
     */
    public static create(id: string, name: string): Form;
    /**
     * Creates a form with name, id and a description.
     * @param id 
     * @param name 
     * @param description 
     */
    public static create(id: string, name: string, description: string):Form; 
    public static create(id?: string, name?: string, description?: string): Form {
        return new Form(
            id ? id : uuid(),
            name ? name : "",
            description ? description : "",
            Map.empty()
        );
    }

    public setName(name: string): Form {
        this.setName(name);
        return this;
    }

    public setDescription(description: string): Form {
        this.setDescription(description)
        return this;
    }

    public addField(field: Field): Form {
        this.fields.put(field.getId(), field);
        return this;
    }
}