export class BasicFormElements {
    private id: string;
    private name: string;
    private description: string;

    protected constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }
}

export class BasicFieldElements {
    private id: string;
    private name: string;
    private description: string;
    private required: boolean;
    //private defaultErrorMessage: string //todo, not sure if needed

    protected constructor(id: string, name: string, description: string, required: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.required = required;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public isRequired(): boolean {
        return this.required;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setRequired(isRequired: boolean) : void {
        this.required = isRequired;
    }
}