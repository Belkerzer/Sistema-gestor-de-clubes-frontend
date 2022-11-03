export interface InventoryActivities {
    id: string;
    docenteTutorActividades?: string;
    name: string;
    description?: string;
    participantesActividades?: string[];
    club?: string | null;
    barcode?: string | null;
    facultadActividades?: string | null;
    programaActividades: string | null;
    stock: Date;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: string;
    weight: number;
    thumbnail: string;
    images: string[];
    active: number;
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

export interface InventoryDocenteTutorActividades {
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface InventoryFacultadActividades {
    id: string;
    name: string;
    slug: string;
}

export interface InventoryParticipanteActividades {
    id?: string;
    title?: string;
}

export interface InventoryProgramaActividades {
    id: string;
    name: string;
    slug: string;
}
