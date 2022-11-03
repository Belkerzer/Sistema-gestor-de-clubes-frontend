import { ActivatedRouteSnapshot, Route, UrlMatchResult, UrlSegment } from '@angular/router';
import { isEqual } from 'lodash-es';
import { AdminComponent } from 'app/modules/admin/admin/admin.component';
import { AdminSettingsAccountPersonalComponent } from 'app/modules/admin/admin/settings/account/personal/personal.component';
import { AdminSettingsAccountSecurityComponent } from './settings/account/security/security.component';
import { AdminActionsCreateUserComponent } from './actions/create-user/create-user.component';
import { UsersDetailsComponent } from './settings/general/users/details/details.component';
import { UsersListComponent } from './settings/general/users/list/list.component';
import { CanDeactivateUsersDetails } from './settings/general/users/users.guards';
import { ContactsClubesResolver, ContactsResolver, ContactsContactResolver, ContactsRolesResolver } from './settings/general/users/users.resolvers';




/**
 * Mailbox custom route matcher
 *
 * @param url
 */
export const adminRouteMatcher: (url: UrlSegment[]) => UrlMatchResult = (url: UrlSegment[]) => {

    // Prepare consumed url and positional parameters
    let consumed = url;
    const posParams = {};

    // Settings
    if (url[0].path === 'acciones' || url[0].path === 'actividades' || url[0].path === 'ajustes') {
        // Do not match
        return null;
    }
    // Filter or label
    else if (url[0].path === 'filter' || url[0].path === 'label') {
        posParams[url[0].path] = url[1];
        posParams['page'] = url[2];

        // Remove the id if exists
        if (url[3]) {
            consumed = url.slice(0, -1);
        }
    }
    // Folder
    else {
        posParams['folder'] = url[0];
        posParams['page'] = url[1];

        // Remove the id if exists
        if (url[2]) {
            consumed = url.slice(0, -1);
        }
    }

    return {
        consumed,
        posParams
    };
};

export const mailboxRunGuardsAndResolvers: (from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot) => boolean = (from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot) => {

    // If we are navigating from mail to mails, meaning there is an id in
    // from's deepest first child and there isn't one in the to's, we will
    // trigger the resolver

    // Get the current activated route of the 'from'
    let fromCurrentRoute = from;
    while (fromCurrentRoute.firstChild) {
        fromCurrentRoute = fromCurrentRoute.firstChild;
    }

    // Get the current activated route of the 'to'
    let toCurrentRoute = to;
    while (toCurrentRoute.firstChild) {
        toCurrentRoute = toCurrentRoute.firstChild;
    }

    // Trigger the resolver if the condition met
    if (fromCurrentRoute.paramMap.get('id') && !toCurrentRoute.paramMap.get('id')) {
        return true;
    }

    // If the from and to params are equal, don't trigger the resolver
    const fromParams = {};
    const toParams = {};

    from.paramMap.keys.forEach((key) => {
        fromParams[key] = from.paramMap.get(key);
    });

    to.paramMap.keys.forEach((key) => {
        toParams[key] = to.paramMap.get(key);
    });

    if (isEqual(fromParams, toParams)) {
        return false;
    }

    // Trigger the resolver on other cases
    return true;
};

export const adminRoutes: Route[] = [
/*     {
        path: '',
        redirectTo: 'inbox/1',
        pathMatch: 'full'
    }, */
    {
        path: '',
        redirectTo: 'ajustes/cuenta/personal',
        pathMatch: 'full'
    },
    {
        path: 'acciones',
        redirectTo: 'acciones/crear-usuario',
        pathMatch: 'full'
    },
    {
        path: 'actividades',
        redirectTo: 'actividades/todas-las-actividades',
        pathMatch: 'full'
    },
    {
        path: 'ajustes',
        redirectTo: 'ajustes/cuenta/personal',
        pathMatch: 'full'
    },
    {
        path: 'ajustes/cuenta',
        redirectTo: 'ajustes/cuenta/personal',
        pathMatch: 'full'
    },
    {
        path: 'ajustes/general',
        redirectTo: 'ajustes/general/usuarios',
        pathMatch: 'full'
    },
    {
        path: 'filter/:filter',
        redirectTo: 'filter/:filter/1',
        pathMatch: 'full'
    },
    {
        path: 'label/:label',
        redirectTo: 'label/:label/1',
        pathMatch: 'full'
    },
    {
        path: ':folder',
        redirectTo: ':folder/1',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AdminComponent,
        resolve: {
            clubes: ContactsClubesResolver
        },
        children: [
/*             {
                component: AdminListComponent,
                matcher: mailboxRouteMatcher,
                runGuardsAndResolvers: mailboxRunGuardsAndResolvers,
                resolve: {
                    mails: MailboxMailsResolver
                },
                children: [
                    {
                        path: '',
                        component: AdminDetailsComponent,
                      children: [
                                                    {
                                                        path: ':id',
                                                        resolve: {
                                                            mail: MailboxMailResolver
                                                        }
                                                    }
                        ] 
                    }
                ]
            }, */
            {
                path: 'acciones',                
                children: [
                    {
                        path: 'crear-usuario',
                        component: AdminActionsCreateUserComponent
                    }
                ]
            },
            /*            {
                           path: 'actividades',
                           children: [
                               {
                                   path: 'todas-las-actividades',
                                   component: FileManagerComponent,
                                   children: [
                                       {
                                           path: 'folders/:folderId',
                                           component: FileManagerListComponent,
                                           resolve: {
                                               item: FileManagerFolderResolver
                                           },
                                           children: [
                                               {
                                                   path: 'details/:id',
                                                   component: FileManagerDetailsComponent,
                                                   resolve: {
                                                       item: FileManagerItemResolver
                                                   },
                                                   canDeactivate: [CanDeactivateFileManagerDetails]
                                               }
                                           ]
                                       },
                                       {
                                           path: '',
                                           component: FileManagerListComponent,
                                           resolve: {
                                               items: FileManagerItemsResolver
                                           },
                                           children: [
                                               {
                                                   path: 'details/:id',
                                                   component: FileManagerDetailsComponent,
                                                   resolve: {
                                                       item: FileManagerItemResolver
                                                   },
                                                   canDeactivate: [CanDeactivateFileManagerDetails]
                                               }
                                           ]
                                       }
                                   ]
                               }
                           ]
                       }, */
            {
                path: 'ajustes',
                children: [
                    {
                        path: 'general',
                        children: [
                            {
                                path: 'usuarios',
                                component: UsersListComponent,
                                resolve: {
                                    tasks: ContactsResolver,
                                    /* countries: ContactsCountriesResolver, */
                                    roles: ContactsRolesResolver
                                },
                                children: [
                                    {
                                        path: ':id',
                                        component: UsersDetailsComponent,
                                        resolve: {
                                            task: ContactsContactResolver,
                                            /* countries: ContactsCountriesResolver, */
                                            roles: ContactsRolesResolver
                                        },
                                        canDeactivate: [CanDeactivateUsersDetails]
                                    }
                                ]

                            },
                        ]
                    }

                ]
            },
            {
                path: 'ajustes',                
                children: [
                    {
                        path: 'cuenta',
                        children: [
                            {
                                path: 'personal',
                                component: AdminSettingsAccountPersonalComponent
                            }
                        ]
                    }

                ]
            },
            {
                path: 'ajustes',
                children: [
                    {
                        path: 'cuenta',
                        children: [
                            {
                                path: 'seguridad',
                                component: AdminSettingsAccountSecurityComponent
                            }
                        ]
                    }

                ]
            }
        ]
    }
];
