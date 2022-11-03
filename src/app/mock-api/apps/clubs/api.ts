import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { facultadesClub as facultadesClubData, lideresEstudiantiles as lideresEstudiantilesData, clubs as clubsData, docentesTutores as docentesTutoresData, programas as programasData } from 'app/mock-api/apps/clubs/data';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ClubsInventoryMockApi {
    private _lideresEstudiantiles: any[] = lideresEstudiantilesData;
    private _facultadesClub: any[] = facultadesClubData;
    private _clubs: any[] = clubsData;
    private _docentesTutores: any[] = docentesTutoresData;
    private _programas: any[] = programasData;

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
        // @ Líderes Estudiantiles - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/lideresEstudiantiles')
            .reply(() => [200, cloneDeep(this._lideresEstudiantiles)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Facultades Club - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/facultadesClub')
            .reply(() => [200, cloneDeep(this._facultadesClub)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Clubs - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/clubes', 300)
            .reply(({ request }) => {

                // Get available queries
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'name';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                // Clone the clubs
                let clubs: any[] | null = cloneDeep(this._clubs);

                // Sort the clubs
                if (sort === 'tipo' || sort === 'name' || sort === 'participantes') {
                    clubs.sort((a, b) => {
                        const fieldA = a[sort].toString().toUpperCase();
                        const fieldB = b[sort].toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                }
                else {
                    clubs.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                }

                // If search exists...
                if (search) {
                    // Filter the clubs
                    clubs = clubs.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
                }

                // Paginate - Start
                const clubsLength = clubs.length;

                // Calculate paginationClubs details
                const begin = page * size;
                const end = Math.min((size * (page + 1)), clubsLength);
                const lastPage = Math.max(Math.ceil(clubsLength / size), 1);

                // Prepare the paginationClubs object
                let paginationClubs = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // clubs but also send the last possible page so
                // the app can navigate to there
                if (page > lastPage) {
                    clubs = null;
                    paginationClubs = {
                        lastPage
                    };
                }
                else {
                    // Paginate the results by size
                    clubs = clubs.slice(begin, end);

                    // Prepare the paginationClubs mock-api
                    paginationClubs = {
                        length: clubsLength,
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
                        clubs,
                        paginationClubs
                    }
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Club - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/club')
            .reply(({ request }) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the clubs
                const clubs = cloneDeep(this._clubs);

                // Find the club
                const club = clubs.find(item => item.id === id);

                // Return the response
                return [200, club];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Club - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/club')
            .reply(() => {

                // Generate a new club
                const newClub = {
                    id: FuseMockApiUtils.guid(),
                    liderEstudiantil: '',
                    name: 'Un nuevo club',
                    description: '',
                    docentesTutores: [],
                    tipo: '',
                    /* barcode: '', */
                    facultadClub: '',
                    /* programa: '', */
                    fechaCreacion: moment().startOf('day').subtract('days').format('LL'),
/*                     reserved: '',
                    cost: '',
                    basePrice: '',
                    taxPercent: '',
                    price: '',
                    weight: '',
                    thumbnail: '',
                    images: [], */
                    participantes: 0
                };

                // Unshift the new club
                this._clubs.unshift(newClub);

                // Return the response
                return [200, newClub];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Club - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/club')
            .reply(({ request }) => {

                // Get the id and club
                const id = request.body.id;
                const club = cloneDeep(request.body.club);

                // Prepare the updated club
                let updatedClub = null;

                // Find the club and update it
                this._clubs.forEach((item, index, clubs) => {

                    if (item.id === id) {
                        // Update the club
                        clubs[index] = assign({}, clubs[index], club);

                        // Store the updated club
                        updatedClub = clubs[index];
                    }
                });

                // Return the response
                return [200, updatedClub];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Club - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/club')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the club and delete it
                this._clubs.forEach((item, index) => {

                    if (item.id === id) {
                        this._clubs.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Docentes Tutores - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/docentesTutores')
            .reply(() => [200, cloneDeep(this._docentesTutores)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Docentes Tutores - POST
        // -----------------------------------------------------------------------------------------------------
/*         this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/docenteTutor')
            .reply(({ request }) => {
 */
                // Get the docenteTutor
        /*         const newDocenteTutor = cloneDeep(request.body.docenteTutor); */

                // Generate a new GUID
        /*       newDocenteTutor.id = FuseMockApiUtils.guid(); */

                // Unshift the new docenteTutor
        /*            this._docentesTutores.unshift(newDocenteTutor); */

                // Return the response
        /*           return [200, newDocenteTutor];
              }); */

        // -----------------------------------------------------------------------------------------------------
        // @ Docentes Tutores - PATCH
        // -----------------------------------------------------------------------------------------------------
        /*     this._fuseMockApiService
                .onPatch('api/apps/ecommerce/inventory/docenteTutor')
                .reply(({ request }) => { */

                // Get the id and docenteTutor
        /*       const id = request.body.id;
              const docenteTutor = cloneDeep(request.body.docenteTutor); */

                // Prepare the updated docenteTutor
        /*      let updatedDocenteTutor = null; */

                // Find the docenteTutor and update it
             /*    this._docentesTutores.forEach((item, index, docentesTutores) => {

                    if (item.id === id) { */
                        // Update the docenteTutor
        /*             docentesTutores[index] = assign({}, docentesTutores[index], docenteTutor); */

                        // Store the updated docenteTutor
          /*               updatedDocenteTutor = docentesTutores[index];
                    }
                }); */

                // Return the response
        /*        return [200, updatedDocenteTutor];
           }); */

        // -----------------------------------------------------------------------------------------------------
        // @ Docente Tutor - DELETE
        // -----------------------------------------------------------------------------------------------------
        /*         this._fuseMockApiService
                    .onDelete('api/apps/ecommerce/inventory/docenteTutor')
                    .reply(({ request }) => { */

                // Get the id
        /*      const id = request.params.get('id'); */

                // Find the docenteTutor and delete it
     /*            this._docentesTutores.forEach((item, index) => {

                    if (item.id === id) {
                        this._docentesTutores.splice(index, 1);
                    }
                }); */

                // Get the clubs that have the docenteTutor
        /*     const clubsWithDocenteTutor = this._clubs.filter(club => club.docentesTutores.indexOf(id) > -1); */

                // Iterate through them and delete the docenteTutor
        /*      clubsWithDocenteTutor.forEach((club) => {
                 club.docentesTutores.splice(club.docentesTutores.indexOf(id), 1);
             }); */

                // Return the response
        /*            return [200, true];
               }); */

        // -----------------------------------------------------------------------------------------------------
        // @ Programas - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/programas')
            .reply(() => [200, cloneDeep(this._programas)]);
    }
}
