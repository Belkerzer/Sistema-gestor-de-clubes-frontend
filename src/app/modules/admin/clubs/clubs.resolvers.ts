import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InventoryFacultadClub, InventoryLiderEstudiantil, InventoryPagination, InventoryClubs, InventoryDocenteTutor, InventoryPrograma, InventoryParticipanteClubes } from 'app/modules/admin/clubs/clubs.types';
import {ClubsService, Docentes, Facultades, IClubes, Lideres, Participante, Programas} from './clubs.service';

@Injectable({
    providedIn: 'root'
})
export class InventoryFacultadesClubResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ClubsService) {
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
        return this._inventoryService.getFacultades();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryLideresEstudiantilesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ClubsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lideres[]> {
        return this._inventoryService.getLideresEstudiantiles();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryClubResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _inventoryService: ClubsService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClubes> {
        return this._inventoryService.getClubById(parseInt(route.paramMap.get('id'),10))
            .pipe(
                // Error here means the requested club is not available
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
export class InventoryClubsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ClubsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClubes[]> {
        return this._inventoryService.getClubs();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryDocentesTutoresResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ClubsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Docentes[]> {
        return this._inventoryService.getDocentesTutores();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryParticipantesClubesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ClubsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Participante[]> {
        return this._inventoryService.getParticipantesClubes();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryProgramasResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ClubsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Programas[]> {
        return this._inventoryService.getProgramas();
    }
}
