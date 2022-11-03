export interface InventoryClubs {
    id: string;
    docenteTutor?: string;
    name: string;
    description?: string;
    docentesTutores?: string[];
    tipo?: string | null;
    /* barcode?: string | null; */
    facultadClub?: string | null;
    /* programa: string | null; */
    fechaCreacion: Date;
/*     reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: string;
    weight: number;
    thumbnail: string;
    images: string[]; */
    participantes: number;
}

export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface InventoryLiderEstudiantil {
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface InventoryFacultadClub {
    id: string;
    name: string;
    slug: string;
}

export interface InventoryDocenteTutor {
    id?: string;
    title?: string;
}

export interface InventoryPrograma {
    id: string;
    name: string;
    slug: string;
}
