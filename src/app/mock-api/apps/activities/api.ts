import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { brands2 as brands2Data, categories2 as categories2Data, activities as activitiesData, tags2 as tags2Data, vendors2 as vendors2Data } from 'app/mock-api/apps/activities/data';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesInventoryMockApi {
    private _categories2: any[] = categories2Data;
    private _brands2: any[] = brands2Data;
    private _activities: any[] = activitiesData;
    private _tags2: any[] = tags2Data;
    private _vendors2: any[] = vendors2Data;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Categories - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/categories2')
            .reply(() => [200, cloneDeep(this._categories2)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Brands - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/brands2')
            .reply(() => [200, cloneDeep(this._brands2)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Products - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/activities', 300)
            .reply(({ request }) => {

                // Get available queries
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'name';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                // Clone the products
                let products: any[] | null = cloneDeep(this._activities);

                // Sort the products
                if (sort === 'sku' || sort === 'name' || sort === 'active') {
                    products.sort((a, b) => {
                        const fieldA = a[sort].toString().toUpperCase();
                        const fieldB = b[sort].toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                }
                else {
                    products.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                }

                // If search exists...
                if (search) {
                    // Filter the products
                    products = products.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
                }

                // Paginate - Start
                const productsLength = products.length;

                // Calculate pagination details
                const begin = page * size;
                const end = Math.min((size * (page + 1)), productsLength);
                const lastPage = Math.max(Math.ceil(productsLength / size), 1);

                // Prepare the pagination object
                let pagination = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // products but also send the last possible page so
                // the app can navigate to there
                if (page > lastPage) {
                    products = null;
                    pagination = {
                        lastPage
                    };
                }
                else {
                    // Paginate the results by size
                    products = products.slice(begin, end);

                    // Prepare the pagination mock-api
                    pagination = {
                        length: productsLength,
                        size: size,
                        page: page,
                        lastPage: lastPage,
                        startIndex: begin,
                        endIndex: end - 1
                    };
                }

                // Return the response
                return [
                    200,
                    {
                        products,
                        pagination
                    }
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/activity')
            .reply(({ request }) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the products
                const products = cloneDeep(this._activities);

                // Find the product
                const product = products.find(item => item.id === id);

                // Return the response
                return [200, product];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/activity')
            .reply(() => {

                // Generate a new product
                const newProduct = {
                    id: FuseMockApiUtils.guid(),
                    category: '',
                    name: 'Una nueva actividad',
                    description: '',
                    tags: [],
                    sku: '',
                    barcode: '',
                    brand: '',
                    vendor: '',
                    stock: moment().startOf('day').subtract('days').format('LL'),
                    reserved: '',
                    cost: '',
                    basePrice: '',
                    taxPercent: '',
                    price: '',
                    weight: '',
                    thumbnail: '',
                    images: [],
                    active: 0
                };

                // Unshift the new product
                this._activities.unshift(newProduct);

                // Return the response
                return [200, newProduct];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/activity')
            .reply(({ request }) => {

                // Get the id and product
                const id = request.body.id;
                const product = cloneDeep(request.body.product);

                // Prepare the updated product
                let updatedProduct = null;

                // Find the product and update it
                this._activities.forEach((item, index, products) => {

                    if (item.id === id) {
                        // Update the product
                        products[index] = assign({}, products[index], product);

                        // Store the updated product
                        updatedProduct = products[index];
                    }
                });

                // Return the response
                return [200, updatedProduct];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/activity')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the product and delete it
                this._activities.forEach((item, index) => {

                    if (item.id === id) {
                        this._activities.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/tags2')
            .reply(() => [200, cloneDeep(this._tags2)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/tag2')
            .reply(({ request }) => {

                // Get the tag
                const newTag = cloneDeep(request.body.tag);

                // Generate a new GUID
                newTag.id = FuseMockApiUtils.guid();

                // Unshift the new tag
                this._tags2.unshift(newTag);

                // Return the response
                return [200, newTag];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/tag2')
            .reply(({ request }) => {

                // Get the id and tag
                const id = request.body.id;
                const tag = cloneDeep(request.body.tag);

                // Prepare the updated tag
                let updatedTag = null;

                // Find the tag and update it
                this._tags2.forEach((item, index, tags) => {

                    if (item.id === id) {
                        // Update the tag
                        tags[index] = assign({}, tags[index], tag);

                        // Store the updated tag
                        updatedTag = tags[index];
                    }
                });

                // Return the response
                return [200, updatedTag];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tag - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/tag2')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the tag and delete it
                this._tags2.forEach((item, index) => {

                    if (item.id === id) {
                        this._tags2.splice(index, 1);
                    }
                });

                // Get the products that have the tag
                const productsWithTag = this._activities.filter(product => product.tags.indexOf(id) > -1);

                // Iterate through them and delete the tag
                productsWithTag.forEach((product) => {
                    product.tags.splice(product.tags.indexOf(id), 1);
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Vendors - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/vendors2')
            .reply(() => [200, cloneDeep(this._vendors2)]);
    }
}
