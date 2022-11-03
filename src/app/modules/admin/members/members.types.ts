export interface InventoryMember {
    id: string;
    periodo?: string;
    name: string;
    description?: string;
    clubes?: string[];
    sku?: string | null;
    barcode?: string | null;
    carrera?: string | null;
    sexo: string | null;
    stock: Date;
    reserved: string;
    cost: string;
    basePrice: number;
    taxPercent: number;
    price: string;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
    facultad: string;
}

export interface InventoryPagination {
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface InventoryPeriodo {
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface InventoryCarrera {
    id: string;
    name: string;
    slug: string;
}

export interface InventoryClub {
    id?: string;
    title?: string;
}

export interface InventorySexo {
    id: string;
    name: string;
    slug: string;
}

export interface InventoryFacultad {
    id: string;
    name: string;
    slug: string;
}
