export interface Contact
{
    id: string;
    avatar?: string | null;
    background?: string | null;
    name: string;
    email: string;
    phoneNumbers?: {
        country: string;
        phoneNumber: string;
        label: string;
    }[];
    title?: string;
    company?: string;
    birthday?: string | null;
    address?: string | null;
    username: string;
    clubes: string[];
    rol: string;
}

/* export interface Country
{
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
} */

export interface Club {
    id?: string;
    title?: string;
}

export interface Rol {
    label: string;
    value: string;
    description: string;
}