import { Route } from '@angular/router';
import { ClubsComponent } from 'app/modules/admin/clubs/clubs.component';
import { InventoryFacultadesClubResolver, InventoryLideresEstudiantilesResolver, InventoryClubsResolver, InventoryDocentesTutoresResolver, InventoryProgramasResolver, InventoryParticipantesClubesResolver } from './clubs.resolvers';

export const clubsRoutes: Route[] = [
    {
        path: '',
        component: ClubsComponent,
        resolve: {
            facultadesClub: InventoryFacultadesClubResolver,
            lideresEstudiantiles: InventoryLideresEstudiantilesResolver,
            clubs: InventoryClubsResolver,
            participantesClubes: InventoryParticipantesClubesResolver,
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
