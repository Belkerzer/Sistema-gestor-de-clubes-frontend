import { Route } from '@angular/router';
import { ClubsComponent } from 'app/modules/admin/clubs/clubs.component';
import { InventoryFacultadesClubResolver, InventoryLideresEstudiantilesResolver, InventoryClubsResolver, InventoryDocentesTutoresResolver, InventoryProgramasResolver } from './clubs.resolvers';

export const clubsRoutes: Route[] = [
    {
        path: '',
        component: ClubsComponent,
        resolve: {
            facultadesClub: InventoryFacultadesClubResolver,
            lideresEstudiantiles: InventoryLideresEstudiantilesResolver,
            clubs: InventoryClubsResolver,
            docentesTutores: InventoryDocentesTutoresResolver,
            programas: InventoryProgramasResolver
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
