import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartnersService } from './partners.service';
import { Partner, Rol, Club } from './partners.types';

@Injectable({
    providedIn: 'root'
})
export class PartnersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _partnersService: PartnersService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partner[]> {
        return this._partnersService.getPartners();
    }
}

@Injectable({
    providedIn: 'root'
})
export class PartnersPartnerResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _partnersService: PartnersService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partner> {
        return this._partnersService.getPartnerById(route.paramMap.get('id'))
            .pipe(
                // Error here means the requested partner is not available
                catchError((error) => {

                    // Log the error
                    console.error(error);

                    // Get the parent url
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);

                    // Throw an error
                    return throwError(error);
                })
            );
    }
}

/* @Injectable({
    providedIn: 'root'
})
export class PartnersCountriesResolver implements Resolve<any>
{ */
/**
 * Constructor
 */
/*     constructor(private _partnersService: PartnersService) {
    } */

// -----------------------------------------------------------------------------------------------------
// @ Public methods
// -----------------------------------------------------------------------------------------------------

/**
 * Resolver
 *
 * @param route
 * @param state
 */
/*     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[]> {
        return this._partnersService.getCountries();
    }
} */

@Injectable({
    providedIn: 'root'
})
export class PartnersClubesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _partnersService: PartnersService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Club[]> {
        return this._partnersService.getClubes();
    }
}

@Injectable({
    providedIn: 'root'
})
export class PartnersRolesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _partnersService: PartnersService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rol[]> {
        return this._partnersService.getRoles();
    }
}