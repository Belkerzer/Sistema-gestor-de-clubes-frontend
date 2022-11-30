import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
    Carreras,
    Facultades,
    MembersService,
    ParticipantesResponse,
    Periodos, Sexos
} from 'app/modules/admin/members/members.service';
import { InventoryCarrera, InventoryPeriodo, InventoryPagination, InventoryMember, InventoryClub, InventorySexo, InventoryFacultad } from 'app/modules/admin/members/members.types';


@Injectable({
    providedIn: 'root'
})
export class InventoryCarrerasResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _membersService: MembersService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Carreras[]> {
        return this._membersService.getCarreras();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryPeriodosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _membersService: MembersService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Periodos[]> {
        return this._membersService.getPeriodos();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryMemberResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _membersService: MembersService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ParticipantesResponse> {
        return this._membersService.getParticipanteById(parseInt(route.paramMap.get('id'), 10))
            .pipe(
                // Error here means the requested member is not available
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

@Injectable({
    providedIn: 'root'
})
export class InventoryMembersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _membersService: MembersService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ParticipantesResponse[]> {
        return this._membersService.getParticipantes();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryClubesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _membersService: MembersService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryClub[]> {
        return this._membersService.getClubes();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventorySexosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _membersService: MembersService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sexos[]> {
        return this._membersService.getSexos();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryFacultadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _membersService: MembersService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Facultades[]> {
        return this._membersService.getFacultades();
    }
}
