export interface InventoryActivities {
    id: string;
    clubActividades?: string;
    name: string;
    observacion?: string;
    participantesActividades?: string[];
    /* sku?: string | null;
    barcode?: string | null; */
    facultadActividades?: string | null;
    programaActividades: string | null;
    fechaPlanificacion: Date;
    horas: number;
    materiales: string;
    fechaSeguimiento: string;
    /* taxPercent: number; */
    lugar: string;
    fechaEstimada: string;
    /*     thumbnail: string;
        images: string[]; */
    logro: number;
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

export interface InventoryClubActividades {
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
