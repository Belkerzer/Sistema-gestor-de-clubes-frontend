export interface InventoryActivities {
    id: string;
    category2?: string;
    name: string;
    description?: string;
    tags?: string[];
    sku?: string | null;
    barcode?: string | null;
    brand2?: string | null;
    vendor2: string | null;
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

export interface InventoryCategory
{
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface InventoryBrand
{
    id: string;
    name: string;
    slug: string;
}

export interface InventoryTag
{
    id?: string;
    title?: string;
}

export interface InventoryVendor
{
    id: string;
    name: string;
    slug: string;
}
