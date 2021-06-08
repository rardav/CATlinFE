export interface User {
    email: string;
    roleId: number; // 1 - examinee, 2 - supervisor
    token: string;
    firstName: string;
    lastName: string;
}