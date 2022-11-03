import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { facultadesActividades as facultadesActividadesData, docentesTutoresActividades as docentesTutoresActividadesData, activities as activitiesData, participantesActividades as participantesActividadesData, periodosActividades as periodosActividadesData } from 'app/mock-api/apps/activities/data';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesInventoryMockApi {
    private _docentesTutoresActividades: any[] = docentesTutoresActividadesData;
    private _facultadesActividades: any[] = facultadesActividadesData;
    private _activities: any[] = activitiesData;
    private _participantesActividades: any[] = participantesActividadesData;
    private _periodosActividades: any[] = periodosActividadesData;

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
        // @ DocentesTutoresActividades - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/docentesTutoresActividades')
            .reply(() => [200, cloneDeep(this._docentesTutoresActividades)]);

        // -----------------------------------------------------------------------------------------------------
        // @ FacultadesActividades - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/facultadesActividades')
            .reply(() => [200, cloneDeep(this._facultadesActividades)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Activities - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/actividades', 300)
            .reply(({ request }) => {

                // Get available queries
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'name';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                // Clone the activities
                let activities: any[] | null = cloneDeep(this._activities);

                // Sort the activities
                if (sort === 'club' || sort === 'name' || sort === 'active') {
                    activities.sort((a, b) => {
                        const fieldA = a[sort].toString().toUpperCase();
                        const fieldB = b[sort].toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                }
                else {
                    activities.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                }

                // If search exists...
                if (search) {
                    // Filter the activities
                    activities = activities.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
                }

                // Paginate - Start
                const activitiesLength = activities.length;

                // Calculate paginationActividades details
                const begin = page * size;
                const end = Math.min((size * (page + 1)), activitiesLength);
                const lastPage = Math.max(Math.ceil(activitiesLength / size), 1);

                // Prepare the paginationActividades object
                let paginationActividades = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // activities but also send the last possible page so
                // the app can navigate to there
                if (page > lastPage) {
                    activities = null;
                    paginationActividades = {
                        lastPage
                    };
                }
                else {
                    // Paginate the results by size
                    activities = activities.slice(begin, end);

                    // Prepare the paginationActividades mock-api
                    paginationActividades = {
                        length: activitiesLength,
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
                        activities,
                        paginationActividades
                    }
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Activity - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/activity')
            .reply(({ request }) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the activities
                const activities = cloneDeep(this._activities);

                // Find the activity
                const activity = activities.find(item => item.id === id);

                // Return the response
                return [200, activity];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Activity - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/activity')
            .reply(() => {

                // Generate a new activity
                const newActivity = {
                    id: FuseMockApiUtils.guid(),
                    docenteTutorActividades: '',
                    name: 'Una nueva actividad',
                    description: '',
                    participantesActividades: [],
                    club: '',
                    barcode: '',
                    factultadActividades: '',
                    programaActividades: '',
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

                // Unshift the new activity
                this._activities.unshift(newActivity);

                // Return the response
                return [200, newActivity];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Activity - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/activity')
            .reply(({ request }) => {

                // Get the id and activity
                const id = request.body.id;
                const activity = cloneDeep(request.body.activity);

                // Prepare the updated activity
                let updatedActivity = null;

                // Find the activity and update it
                this._activities.forEach((item, index, activities) => {

                    if (item.id === id) {
                        // Update the activity
                        activities[index] = assign({}, activities[index], activity);

                        // Store the updated activity
                        updatedActivity = activities[index];
                    }
                });

                // Return the response
                return [200, updatedActivity];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Activity - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/activity')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the activity and delete it
                this._activities.forEach((item, index) => {

                    if (item.id === id) {
                        this._activities.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ ParticipantesActividades - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/participantesActividades')
            .reply(() => [200, cloneDeep(this._participantesActividades)]);

        // -----------------------------------------------------------------------------------------------------
        // @ ParticipantesActividades - POST
        // -----------------------------------------------------------------------------------------------------
        /*     this._fuseMockApiService
                .onPost('api/apps/ecommerce/inventory/participanteActividades')
                .reply(({ request }) => { */

                // Get the participanteActividades
        /*   const newParticipanteActividades = cloneDeep(request.body.participanteActividades); */

                // Generate a new GUID
        /*       newParticipanteActividades.id = FuseMockApiUtils.guid(); */

                // Unshift the new participanteActividades
        /*              this._participantesActividades.unshift(newParticipanteActividades); */

                // Return the response
        /*         return [200, newParticipanteActividades];
            }); */

        // -----------------------------------------------------------------------------------------------------
        // @ ParticipantesActividades - PATCH
        // -----------------------------------------------------------------------------------------------------
        /*         this._fuseMockApiService
                    .onPatch('api/apps/ecommerce/inventory/participanteActividades')
                    .reply(({ request }) => { */

                // Get the id and participanteActividades
        /*      const id = request.body.id;
             const participanteActividades = cloneDeep(request.body.participanteActividades); */

                // Prepare the updated participanteActividades
        /*            let updatedParticipanteActividades = null; */

                // Find the participanteActividades and update it
     /*            this._participantesActividades.forEach((item, index, participanteActividades) => {

                    if (item.id === id) { */
                        // Update the participanteActividades
        /*           participanteActividades[index] = assign({}, participanteActividades[index], participanteActividades); */

                        // Store the updated participanteActividades
        /*                 updatedParticipanteActividades = participanteActividades[index];
                    }
                }); */

                // Return the response
        /*         return [200, updatedParticipanteActividades];
            }); */

        // -----------------------------------------------------------------------------------------------------
        // @ ParticipanteActividades - DELETE
        // -----------------------------------------------------------------------------------------------------
/*         this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/participanteActividades')
            .reply(({ request }) => {
 */
                // Get the id
        /*               const id = request.params.get('id'); */

                // Find the participanteActividades and delete it
      /*           this._participantesActividades.forEach((item, index) => {

                    if (item.id === id) {
                        this._participantesActividades.splice(index, 1);
                    }
                }); */

                // Get the activities that have the participanteActividades
        /*           const activitiesWithParticipanteActividades = this._activities.filter(activity => activity.participanteActividades.indexOf(id) > -1); */

                // Iterate through them and delete the participanteActividades
        /*          activitiesWithParticipanteActividades.forEach((activity) => {
                     activity.participanteActividades.splice(activity.participanteActividades.indexOf(id), 1);
                 }); */

                // Return the response
        /*                 return [200, true];
                    }); */

        // -----------------------------------------------------------------------------------------------------
        // @ Programas Actividades - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/periodosActividades')
            .reply(() => [200, cloneDeep(this._periodosActividades)]);
    }
}
