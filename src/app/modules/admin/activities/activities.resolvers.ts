import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivitiesService } from './activities.service';
import { InventoryActivities, InventoryFacultadActividades, InventoryClubActividades, InventoryPagination, InventoryParticipanteActividades, InventoryProgramaActividades } from './activities.types';


@Injectable({
    providedIn: 'root'
})
export class InventoryFacultadesActividadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ActivitiesService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryFacultadActividades[]> {
        return this._inventoryService.getFacultadesActividades();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryClubesActividadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ActivitiesService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryClubActividades[]> {
        return this._inventoryService.getClubesActividades();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryActivityResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _inventoryService: ActivitiesService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryActivities> {
        return this._inventoryService.getActivityById(route.paramMap.get('id'))
            .pipe(
                // Error here means the requested activity is not available
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
export class InventoryActivitiesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ActivitiesService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ paginationActividades: InventoryPagination; activities: InventoryActivities[] }> {
        return this._inventoryService.getActivities();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryParticipantesActividadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ActivitiesService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryParticipanteActividades[]> {
        return this._inventoryService.getParticipantesActividades();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryProgramaActividadessResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: ActivitiesService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryProgramaActividades[]> {
        return this._inventoryService.getProgramasActividades();
    }
}
