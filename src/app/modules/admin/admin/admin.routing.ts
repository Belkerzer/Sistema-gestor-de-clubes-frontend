import { ActivatedRouteSnapshot, Route, UrlMatchResult, UrlSegment } from '@angular/router';
import { isEqual } from 'lodash-es';
import { AdminComponent } from 'app/modules/admin/admin/admin.component';
import { MailboxFiltersResolver, MailboxFoldersResolver, MailboxLabelsResolver, MailboxMailResolver, MailboxMailsResolver } from 'app/modules/admin/admin/admin.resolvers';
import { AdminListComponent } from 'app/modules/admin/admin/list/list.component';
import { AdminDetailsComponent } from 'app/modules/admin/admin/details/details.component';
import { AdminSettingsComponent } from 'app/modules/admin/admin/settings/account/account.component';
import { AdminSecurityComponent } from './settings/security/security.component';

/**
 * Mailbox custom route matcher
 *
 * @param url
 */
export const mailboxRouteMatcher: (url: UrlSegment[]) => UrlMatchResult = (url: UrlSegment[]) => {

    // Prepare consumed url and positional parameters
    let consumed = url;
    const posParams = {};

    // Settings
    if (url[0].path === 'personal') {
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
    {
        path: '',
        redirectTo: 'inbox/1',
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
            filters: MailboxFiltersResolver,
            folders: MailboxFoldersResolver,
            labels: MailboxLabelsResolver
        },
        children: [
            {
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
                        /*                         children: [
                                                    {
                                                        path: ':id',
                                                        resolve: {
                                                            mail: MailboxMailResolver
                                                        }
                                                    }
                                                ] */
                    }
                ]
            },
            {
                path: 'personal',
                component: AdminSettingsComponent
            },
            {
                path: 'seguridad',
                component: AdminSecurityComponent
            }
        ]
    }
];
