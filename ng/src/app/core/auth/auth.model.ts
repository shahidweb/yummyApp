
export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

export type UserRole =
    (typeof ROLES)[keyof typeof ROLES];


export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface ILoginForm {
    name?: string,
    email: string,
    password: string,
}