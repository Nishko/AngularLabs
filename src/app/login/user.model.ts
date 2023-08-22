export class User {
    username: string;
    birthdate: string;
    age: number;
    email: string;
    password?: string;
    valid: boolean;

    constructor() {
        this.username = "";
        this.birthdate = "";
        this.age = 0;
        this.email = "";
        this.valid = false;
    }
}
