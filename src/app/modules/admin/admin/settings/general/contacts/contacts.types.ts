export interface Contact {
    id: string;
    avatar?: string | null;
    background?: string | null;
    name: string;
    emails?: {
        email: string;
        label: string;
    }[];
    phoneNumbers?: {
        country: string;
        phoneNumber: string;
        label: string;
    }[];
    username?: string;
    company?: string;
    email?: string | null;
    address?: string | null;
    notes?: string | null;
    clubes: string[];
    rol?: string;
}

export interface Country {
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface Club {
    id?: string;
    title?: string;
}

export interface Rol {
    label: string;
    value: string;
    description: string;
}
