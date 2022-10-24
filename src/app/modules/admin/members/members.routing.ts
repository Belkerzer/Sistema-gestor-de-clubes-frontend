import { Route } from '@angular/router';
import { MembersComponent } from 'app/modules/admin/members/members.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryFacultiesResolver, InventoryMembersResolver, InventoryTagsResolver, InventoryVendorsResolver } from './members.resolvers';

export const membersRoutes: Route[] = [
    {
        path: '',
        component: MembersComponent,
        resolve: {
            brands: InventoryBrandsResolver,
            categories: InventoryCategoriesResolver,
            products: InventoryMembersResolver,
            tags: InventoryTagsResolver,
            vendors: InventoryVendorsResolver,
            faculties: InventoryFacultiesResolver
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
