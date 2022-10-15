import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryClubs, InventoryTag, InventoryVendor } from 'app/modules/admin/clubs/clubs.types';

@Injectable({
    providedIn: 'root'
})
export class ClubsService {
    // Private
    private _brands1: BehaviorSubject<InventoryBrand[] | null> = new BehaviorSubject(null);
    private _categories1: BehaviorSubject<InventoryCategory[] | null> = new BehaviorSubject(null);
    private _pagination1: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _club: BehaviorSubject<InventoryClubs | null> = new BehaviorSubject(null);
    private _clubs: BehaviorSubject<InventoryClubs[] | null> = new BehaviorSubject(null);
    private _tags1: BehaviorSubject<InventoryTag[] | null> = new BehaviorSubject(null);
    private _vendors1: BehaviorSubject<InventoryVendor[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for brands
     */
    get brands$(): Observable<InventoryBrand[]> {
        return this._brands1.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<InventoryCategory[]> {
        return this._categories1.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination1.asObservable();
    }

    /**
     * Getter for product
     */
    get product$(): Observable<InventoryClubs> {
        return this._club.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<InventoryClubs[]> {
        return this._clubs.asObservable();
    }

    /**
     * Getter for tags
     */
    get tags$(): Observable<InventoryTag[]> {
        return this._tags1.asObservable();
    }

    /**
     * Getter for vendors
     */
    get vendors$(): Observable<InventoryVendor[]> {
        return this._vendors1.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get brands
     */
    getBrands(): Observable<InventoryBrand[]> {
        return this._httpClient.get<InventoryBrand[]>('api/apps/ecommerce/inventory/brands1').pipe(
            tap((brands1) => {
                this._brands1.next(brands1);
            })
        );
    }

    /**
     * Get categories
     */
    getCategories(): Observable<InventoryCategory[]> {
        return this._httpClient.get<InventoryCategory[]>('api/apps/ecommerce/inventory/categories1').pipe(
            tap((categories1) => {
                this._categories1.next(categories1);
            })
        );
    }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getProducts(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: InventoryPagination; products: InventoryClubs[] }> {
        return this._httpClient.get<{ pagination: InventoryPagination; products: InventoryClubs[] }>('api/apps/ecommerce/inventory/clubs', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination1.next(response.pagination);
                this._clubs.next(response.products);
            })
        );
    }

    /**
     * Get product by id
     */
    getProductById(id: string): Observable<InventoryClubs> {
        return this._clubs.pipe(
            take(1),
            map((products) => {

                // Find the product
                const product = products.find(item => item.id === id) || null;

                // Update the product
                this._club.next(product);

                // Return the product
                return product;
            }),
            switchMap((product) => {

                if (!product) {
                    return throwError('No se pudo encontrar el producto con el id de ' + id + '.');
                }

                return of(product);
            })
        );
    }

    /**
     * Create product
     */
    createProduct(): Observable<InventoryClubs> {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<InventoryClubs>('api/apps/ecommerce/inventory/club', {}).pipe(
                map((newProduct) => {

                    // Update the products with the new product
                    this._clubs.next([newProduct, ...products]);

                    // Return the new product
                    return newProduct;
                })
            ))
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param product
     */
    updateProduct(id: string, product: InventoryClubs): Observable<InventoryClubs> {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.patch<InventoryClubs>('api/apps/ecommerce/inventory/club', {
                id,
                product
            }).pipe(
                map((updatedProduct) => {

                    // Find the index of the updated product
                    const index = products.findIndex(item => item.id === id);

                    // Update the product
                    products[index] = updatedProduct;

                    // Update the products
                    this._clubs.next(products);

                    // Return the updated product
                    return updatedProduct;
                }),
                switchMap(updatedProduct => this.product$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the product if it's selected
                        this._club.next(updatedProduct);

                        // Return the updated product
                        return updatedProduct;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the product
     *
     * @param id
     */
    deleteProduct(id: string): Observable<boolean> {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.delete('api/apps/ecommerce/inventory/club', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted product
                    const index = products.findIndex(item => item.id === id);

                    // Delete the product
                    products.splice(index, 1);

                    // Update the products
                    this._clubs.next(products);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get tags
     */
    getTags(): Observable<InventoryTag[]> {
        return this._httpClient.get<InventoryTag[]>('api/apps/ecommerce/inventory/tags1').pipe(
            tap((tags) => {
                this._tags1.next(tags);
            })
        );
    }

    /**
     * Create tag
     *
     * @param tag
     */
    createTag(tag: InventoryTag): Observable<InventoryTag> {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<InventoryTag>('api/apps/ecommerce/inventory/tag1', { tag }).pipe(
                map((newTag) => {

                    // Update the tags with the new tag
                    this._tags1.next([...tags, newTag]);

                    // Return new tag from observable
                    return newTag;
                })
            ))
        );
    }

    /**
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: InventoryTag): Observable<InventoryTag> {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<InventoryTag>('api/apps/ecommerce/inventory/tag1', {
                id,
                tag
            }).pipe(
                map((updatedTag) => {

                    // Find the index of the updated tag
                    const index = tags.findIndex(item => item.id === id);

                    // Update the tag
                    tags[index] = updatedTag;

                    // Update the tags
                    this._tags1.next(tags);

                    // Return the updated tag
                    return updatedTag;
                })
            ))
        );
    }

    /**
     * Delete the tag
     *
     * @param id
     */
    deleteTag(id: string): Observable<boolean> {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.delete('api/apps/ecommerce/inventory/tag1', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted tag
                    const index = tags.findIndex(item => item.id === id);

                    // Delete the tag
                    tags.splice(index, 1);

                    // Update the tags
                    this._tags1.next(tags);

                    // Return the deleted status
                    return isDeleted;
                }),
                filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.products$.pipe(
                    take(1),
                    map((products) => {

                        // Iterate through the contacts
                        products.forEach((product) => {

                            const tagIndex = product.tags.findIndex(tag => tag === id);

                            // If the contact has the tag, remove it
                            if (tagIndex > -1) {
                                product.tags.splice(tagIndex, 1);
                            }
                        });

                        // Return the deleted status
                        return isDeleted;
                    })
                ))
            ))
        );
    }

    /**
     * Get vendors
     */
    getVendors(): Observable<InventoryVendor[]> {
        return this._httpClient.get<InventoryVendor[]>('api/apps/ecommerce/inventory/vendors1').pipe(
            tap((vendors1) => {
                this._vendors1.next(vendors1);
            })
        );
    }

    /**
     * Update the avatar of the given contact
     *
     * @param id
     * @param avatar
     */
    /*uploadAvatar(id: string, avatar: File): Observable<Contact>
    {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<Contact>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {
                headers: {
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedContact) => {

                    // Find the index of the updated contact
                    const index = contacts.findIndex(item => item.id === id);

                    // Update the contact
                    contacts[index] = updatedContact;

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the updated contact
                    return updatedContact;
                }),
                switchMap(updatedContact => this.contact$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the contact if it's selected
                        this._contact.next(updatedContact);

                        // Return the updated contact
                        return updatedContact;
                    })
                ))
            ))
        );
    }*/
}
