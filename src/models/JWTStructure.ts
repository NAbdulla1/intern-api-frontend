import User from "./User";

export default class JWTStructure {
    exp: number;
    iat: number;
    iss: string;
    user: User;

    constructor(exp: number, iat: number, iss: string, user: User) {
        this.exp = exp;
        this.iat = iat;
        this.iss = iss;
        this.user = user;
    }
}