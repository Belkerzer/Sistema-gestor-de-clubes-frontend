import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnersDetailsComponent } from './details/details.component';


@Injectable({
    providedIn: 'root'
})
export class CanDeactivatePartnersDetails implements CanDeactivate<PartnersDetailsComponent>
{
    canDeactivate(
        component: PartnersDetailsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while (nextRoute.firstChild) {
            nextRoute = nextRoute.firstChild;
        }

        // If the next state doesn't contain '/partners'
        // it means we are navigating away from the
        // partners app
        if (!nextState.url.includes('/contacts')) {
            // Let it navigate
            return true;
        }

        // If we are navigating to another partner...
        if (nextRoute.paramMap.get('id')) {
            // Just navigate
            return true;
        }
        // Otherwise...
        else {
            // Close the drawer first, and then navigate
            return component.closeDrawer().then(() => true);
        }
    }
}
