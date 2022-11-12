import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClubsService } from 'app/modules/admin/clubs/clubs.service';
import { InventoryFacultadClub, InventoryLiderEstudiantil, InventoryPagination, InventoryClubs, InventoryDocenteTutor, InventoryPrograma, InventoryParticipanteClubes } from 'app/modules/admin/clubs/clubs.types';

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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryFacultadClub[]> {
        return this._inventoryService.getFacultadesClub();
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryLiderEstudiantil[]> {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryClubs> {
        return this._inventoryService.getClubById(route.paramMap.get('id'))
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ paginationClubs: InventoryPagination; clubs: InventoryClubs[] }> {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryDocenteTutor[]> {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryParticipanteClubes[]> {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryPrograma[]> {
        return this._inventoryService.getProgramas();
    }
}
