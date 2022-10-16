import { Route } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryClubsResolver, InventoryTagsResolver, InventoryVendorsResolver } from './activities.resolvers';

export const activitiesRoutes: Route[] = [
    {
        path: '',
        component: ActivitiesComponent,
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
