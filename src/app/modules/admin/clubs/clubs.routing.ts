import { Route } from '@angular/router';
import { ClubsComponent } from 'app/modules/admin/clubs/clubs.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryClubsResolver, InventoryTagsResolver, InventoryVendorsResolver } from './clubs.resolvers';

export const clubsRoutes: Route[] = [
    {
        path: '',
        component: ClubsComponent,
        resolve: {
            brands: InventoryBrandsResolver,
            categories: InventoryCategoriesResolver,
            products: InventoryClubsResolver,
            tags: InventoryTagsResolver,
            vendors: InventoryVendorsResolver
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
