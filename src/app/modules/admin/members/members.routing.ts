import { Route } from '@angular/router';
import { MembersComponent } from 'app/modules/admin/members/members.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryProductsResolver, InventoryTagsResolver, InventoryVendorsResolver } from './members.resolvers';

export const membersRoutes: Route[] = [
    {
        path: '',
        component: MembersComponent,
        resolve: {
            brands: InventoryBrandsResolver,
            categories: InventoryCategoriesResolver,
            products: InventoryProductsResolver,
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
