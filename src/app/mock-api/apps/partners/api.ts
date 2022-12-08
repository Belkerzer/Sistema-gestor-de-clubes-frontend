import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { partners as partnersData, clubes as clubesData, roles as rolesData } from 'app/mock-api/apps/partners/data';

@Injectable({
    providedIn: 'root'
})
export class PartnersMockApi {
    private _partners: any[] = partnersData;
    /* private _countries: any[] = countriesData; */
    private _clubes: any[] = clubesData;
    private _roles: any[] = rolesData;

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
        // @ Partners - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/partners/all')
            .reply(() => {

                // Clone the partners
                const partners = cloneDeep(this._partners);

                // Sort the partners by the name field by default
                partners.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, partners];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Partners Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/partners/search')
            .reply(({ request }) => {

                // Get the search query
                const query = request.params.get('query');

                // Clone the partners
                let partners = cloneDeep(this._partners);

                // If the query exists...
                if (query) {
                    // Filter the partners
                    partners = partners.filter(partner => partner.name && partner.name.toLowerCase().includes(query.toLowerCase()));
                }

                // Sort the partners by the name field by default
                partners.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, partners];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Partner - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/partners/partner')
            .reply(({ request }) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the partners
                const partners = cloneDeep(this._partners);

                // Find the partner
                const partner = partners.find(item => item.id === id);

                // Return the response
                return [200, partner];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Partner - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/partners/partner')
            .reply(() => {

                // Generate a new partner
                const newPartner = {
                    id: FuseMockApiUtils.guid(),
                    avatar: null,
                    name: 'Nuevo usuario',
                    emails: [],
                    phoneNumbers: [],
                    job: {
                        title: '',
                        company: ''
                    },
                    birthday: null,
                    address: null,
                    username: '',
                    clubes: [],
                    rol: '',
                };

                // Unshift the new partner
                this._partners.unshift(newPartner);

                // Return the response
                return [200, newPartner];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Partner - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/partners/partner')
            .reply(({ request }) => {

                // Get the id and partner
                const id = request.body.id;
                const partner = cloneDeep(request.body.partner);

                // Prepare the updated partner
                let updatedPartner = null;

                // Find the partner and update it
                this._partners.forEach((item, index, partners) => {

                    if (item.id === id) {
                        // Update the partner
                        partners[index] = assign({}, partners[index], partner);

                        // Store the updated partner
                        updatedPartner = partners[index];
                    }
                });

                // Return the response
                return [200, updatedPartner];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Partner - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/partners/partner')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the partner and delete it
                this._partners.forEach((item, index) => {

                    if (item.id === id) {
                        this._partners.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });


        // -----------------------------------------------------------------------------------------------------
        // @ Countries - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/partners/roles')
            .reply(() => [200, cloneDeep(this._roles)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Countries - GET
        // -----------------------------------------------------------------------------------------------------
        /*         this._fuseMockApiService
                    .onGet('api/apps/partners/countries')
                    .reply(() => [200, cloneDeep(this._countries)]); */

        // -----------------------------------------------------------------------------------------------------
        // @ Clubes - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/partners/clubes')
            .reply(() => [200, cloneDeep(this._clubes)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Clubes - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/partners/club')
            .reply(({ request }) => {

                // Get the club
                const newClub = cloneDeep(request.body.club);

                // Generate a new GUID
                newClub.id = FuseMockApiUtils.guid();

                // Unshift the new club
                this._clubes.unshift(newClub);

                // Return the response
                return [200, newClub];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Clubes - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/partners/club')
            .reply(({ request }) => {

                // Get the id and club
                const id = request.body.id;
                const club = cloneDeep(request.body.club);

                // Prepare the updated club
                let updatedClub = null;

                // Find the club and update it
                this._clubes.forEach((item, index, clubes) => {

                    if (item.id === id) {
                        // Update the club
                        clubes[index] = assign({}, clubes[index], club);

                        // Store the updated club
                        updatedClub = clubes[index];
                    }
                });

                // Return the response
                return [200, updatedClub];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Club - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/partners/club')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the club and delete it
                this._clubes.forEach((item, index) => {

                    if (item.id === id) {
                        this._clubes.splice(index, 1);
                    }
                });

                // Get the partners that have the club
                const partnersWithClub = this._partners.filter(partner => partner.clubes.indexOf(id) > -1);

                // Iterate through them and delete the club
                partnersWithClub.forEach((partner) => {
                    partner.clubes.splice(partner.clubes.indexOf(id), 1);
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Avatar - POST
        // -----------------------------------------------------------------------------------------------------

        /**
         * Read the given file as mock-api url
         *
         * @param file
         */
        const readAsDataURL = (file: File): Promise<any> =>

            // Return a new promise
            new Promise((resolve, reject) => {

                // Create a new reader
                const reader = new FileReader();

                // Resolve the promise on success
                reader.onload = (): void => {
                    resolve(reader.result);
                };

                // Reject the promise on error
                reader.onerror = (e): void => {
                    reject(e);
                };

                // Read the file as the
                reader.readAsDataURL(file);
            })
            ;

        this._fuseMockApiService
            .onPost('api/apps/partners/avatar')
            .reply(({ request }) => {

                // Get the id and avatar
                const id = request.body.id;
                const avatar = request.body.avatar;

                // Prepare the updated partner
                let updatedPartner: any = null;

                // In a real world application, this would return the path
                // of the saved image file (from host, S3 bucket, etc.) but,
                // for the sake of the demo, we encode the image to base64
                // and return it as the new path of the uploaded image since
                // the src attribute of the img club works with both image urls
                // and encoded images.
                return from(readAsDataURL(avatar)).pipe(
                    map((path) => {

                        // Find the partner and update it
                        this._partners.forEach((item, index, partners) => {

                            if (item.id === id) {
                                // Update the avatar
                                partners[index].avatar = path;

                                // Store the updated partner
                                updatedPartner = partners[index];
                            }
                        });

                        // Return the response
                        return [200, updatedPartner];
                    })
                );
            });
    }
}
