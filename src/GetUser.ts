import User from "./models/User";

function getUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    const user: User = [JSON.parse(userJson)].map((uj: any) => uj)[0];
    return user;
}

export default getUser;