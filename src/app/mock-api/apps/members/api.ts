import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { carreras as carrerasData, periodos as periodosData, participantes as participantesData, clubes as clubesData, sexos as sexosData, facultades as facultadesData } from 'app/mock-api/apps/members/data';
import moment from 'moment';
import 'app/moment.es.ts';
moment.locale('es');

@Injectable({
    providedIn: 'root'
})
export class MembersInventoryMockApi {
    private _periodos: any[] = periodosData;
    private _carreras: any[] = carrerasData;
    private _participantes: any[] = participantesData;
    private _clubes: any[] = clubesData;
    private _sexos: any[] = sexosData;
    private _facultades: any[] = facultadesData;

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
        // @ Periodos - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/periodos')
            .reply(() => [200, cloneDeep(this._periodos)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Carreras - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/carreras')
            .reply(() => [200, cloneDeep(this._carreras)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Participantes - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/participantes', 300)
            .reply(({ request }) => {

                // Get available queries
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'name';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                // Clone the participantes
                let participantes: any[] | null = cloneDeep(this._participantes);

                // Sort the participantes
                if (sort === 'codigo' || sort === 'name' || sort === 'active') {
                    participantes.sort((a, b) => {
                        const fieldA = a[sort].toString().toUpperCase();
                        const fieldB = b[sort].toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                }
                else {
                    participantes.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                }

                // If search exists...
                if (search) {
                    // Filter the participantes
                    participantes = participantes.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
                }

                // Paginate - Start
                const participantesLength = participantes.length;

                // Calculate pagination details
                const begin = page * size;
                const end = Math.min((size * (page + 1)), participantesLength);
                const lastPage = Math.max(Math.ceil(participantesLength / size), 1);

                // Prepare the pagination object
                let pagination = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // participantes but also send the last possible page so
                // the app can navigate to there
                if (page > lastPage) {
                    participantes = null;
                    pagination = {
                        lastPage
                    };
                }
                else {
                    // Paginate the results by size
                    participantes = participantes.slice(begin, end);

                    // Prepare the pagination mock-api
                    pagination = {
                        length: participantesLength,
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
                        participantes,
                        pagination
                    }
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Facultades - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/facultades')
            .reply(() => [200, cloneDeep(this._facultades)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Participante - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/participante')
            .reply(({ request }) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the participantes
                const participantes = cloneDeep(this._participantes);

                // Find the participante
                const participante = participantes.find(item => item.id === id);

                // Return the response
                return [200, participante];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Participante - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/participante')
            .reply(() => {

                // Generate a new participante
                const newParticipante = {
                    id: FuseMockApiUtils.guid(),
                    periodo: '',
                    name: 'Un nuevo participante',
                    observacion: '',
                    clubes: [],
                    codigo: '',
                    cedula: '',
                    carrera: '',
                    sexo: '',
                    facultad: '',
                    integracion: moment().startOf('day').subtract('days').format('LL'),
                    correoElectronico: '',
                    fechaNacimiento: '',
                    /* basePrice: '',
                    taxPercent: '',
                    price: '',
                    weight: '',
                    thumbnail: '',
                    images: [], */
                    active: false
                };

                // Unshift the new participante
                this._participantes.unshift(newParticipante);

                // Return the response
                return [200, newParticipante];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Participante - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/participante')
            .reply(({ request }) => {

                // Get the id and participante
                const id = request.body.id;
                const participante = cloneDeep(request.body.participante);

                // Prepare the updated participante
                let updatedParticipante = null;

                // Find the participante and update it
                this._participantes.forEach((item, index, participantes) => {

                    if (item.id === id) {
                        // Update the participante
                        participantes[index] = assign({}, participantes[index], participante);

                        // Store the updated participante
                        updatedParticipante = participantes[index];
                    }
                });

                // Return the response
                return [200, updatedParticipante];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Participante - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/participante')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the participante and delete it
                this._participantes.forEach((item, index) => {

                    if (item.id === id) {
                        this._participantes.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Clubes - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/clubes')
            .reply(() => [200, cloneDeep(this._clubes)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Clubes - POST
        // -----------------------------------------------------------------------------------------------------
        /*         this._fuseMockApiService
                    .onPost('api/apps/ecommerce/inventory/club')
                    .reply(({ request }) => { */

                // Get the club
        /*             const newClub = cloneDeep(request.body.tag); */

                // Generate a new GUID
        /*            newClub.id = FuseMockApiUtils.guid(); */

                // Unshift the new tag
        /*           this._clubes.unshift(newClub); */

                // Return the response
        /*                 return [200, newClub];
                    }); */

        // -----------------------------------------------------------------------------------------------------
        // @ Clubes - PATCH
        // -----------------------------------------------------------------------------------------------------
        /*         this._fuseMockApiService
                    .onPatch('api/apps/ecommerce/inventory/club')
                    .reply(({ request }) => { */

                // Get the id and club
        /*        const id = request.body.id;
               const club = cloneDeep(request.body.club); */

                // Prepare the updated club
        /*       let updatedClub = null; */

                // Find the tag and update it
     /*            this._clubes.forEach((item, index, clubes) => {

                    if (item.id === id) { */
                        // Update the club
        /*                     clubes[index] = assign({}, clubes[index], club); */

                        // Store the updated club
       /*                  updatedClub = clubes[index];
                    }
                }); */

                // Return the response
        /*                 return [200, updatedClub];
                    }); */

        // -----------------------------------------------------------------------------------------------------
        // @ Club - DELETE
        // -----------------------------------------------------------------------------------------------------
        /*         this._fuseMockApiService
                    .onDelete('api/apps/ecommerce/inventory/club')
                    .reply(({ request }) => { */

                // Get the id
        /*           const id = request.params.get('id'); */

                // Find the club and delete it
/*                 this._clubes.forEach((item, index) => {

                    if (item.id === id) {
                        this._clubes.splice(index, 1);
                    }
                }); */

                // Get the participantes that have the club
        /*                 const participantesWithClub = this._participantes.filter(participante => participante.clubes.indexOf(id) > -1); */

                // Iterate through them and delete the club
        /*                 participantesWithClub.forEach((participante) => {
                            participante.clubes.splice(participante.clubes.indexOf(id), 1);
                        }); */

                // Return the response
        /*                 return [200, true];
                    }); */

        // -----------------------------------------------------------------------------------------------------
        // @ Sexos - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/sexos')
            .reply(() => [200, cloneDeep(this._sexos)]);
    }
}
