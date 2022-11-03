import { Route } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { InventoryFacultadesActividadesResolver, InventoryClubesActividadesResolver, InventoryActivitiesResolver, InventoryParticipantesActividadesResolver, InventoryProgramaActividadessResolver } from './activities.resolvers';

export const activitiesRoutes: Route[] = [
    {
        path: '',
        component: ActivitiesComponent,
        resolve: {
            facultadesActividades: InventoryFacultadesActividadesResolver,
            clubesActividades: InventoryClubesActividadesResolver,
            activities: InventoryActivitiesResolver,
            participantesAcitividades: InventoryParticipantesActividadesResolver,
            periodosActividades: InventoryProgramaActividadessResolver
        }
    }

    /*children : [
        {
            path     : '',
            component: ContactsListComponent,
            resolve  : {
                tasks    : ContactsResolver,
                countries: ContactsCountriesResolver
            },
            children : [
                {
                    path         : ':id',
                    component    : ContactsDetailsComponent,
                    resolve      : {
                        task     : ContactsContactResolver,
                        countries: ContactsCountriesResolver
                    },
                    canDeactivate: [CanDeactivateContactsDetails]
                }
            ]
        }
    ]*/

];
