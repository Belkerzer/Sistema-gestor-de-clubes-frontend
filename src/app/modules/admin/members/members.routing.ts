import { Route } from '@angular/router';
import { MembersComponent } from 'app/modules/admin/members/members.component';
import { InventoryCarrerasResolver, InventoryPeriodosResolver, InventoryFacultadesResolver, InventoryMembersResolver, InventoryClubesResolver, InventorySexosResolver } from './members.resolvers';

export const membersRoutes: Route[] = [
    {
        path: '',
        component: MembersComponent,
        resolve: {
            carreras: InventoryCarrerasResolver,
            periodos: InventoryPeriodosResolver,
            facultades: InventoryFacultadesResolver,
            participantes: InventoryMembersResolver,
            clubes: InventoryClubesResolver,
            sexos: InventorySexosResolver
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
