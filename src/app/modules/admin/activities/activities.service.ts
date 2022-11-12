import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { InventoryActivities, InventoryFacultadActividades, InventoryClubActividades, InventoryPagination, InventoryParticipanteActividades, InventoryProgramaActividades } from './activities.types';


@Injectable({
    providedIn: 'root'
})
export class ActivitiesService {
    // Private
    private _facultadesActividades: BehaviorSubject<InventoryFacultadActividades[] | null> = new BehaviorSubject(null);
    private _clubesActividades: BehaviorSubject<InventoryClubActividades[] | null> = new BehaviorSubject(null);
    private _paginationActividades: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _activity: BehaviorSubject<InventoryActivities | null> = new BehaviorSubject(null);
    private _activities: BehaviorSubject<InventoryActivities[] | null> = new BehaviorSubject(null);
    private _participantesActividades: BehaviorSubject<InventoryParticipanteActividades[] | null> = new BehaviorSubject(null);
    private _periodosActividades: BehaviorSubject<InventoryProgramaActividades[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for facultadesActividades
     */
    get facultadesActividades$(): Observable<InventoryFacultadActividades[]> {
        return this._facultadesActividades.asObservable();
    }

    /**
     * Getter for clubesActividades
     */
    get clubesActividades$(): Observable<InventoryClubActividades[]> {
        return this._clubesActividades.asObservable();
    }

    /**
     * Getter for paginationActividades
     */
    get paginationActividades$(): Observable<InventoryPagination> {
        return this._paginationActividades.asObservable();
    }

    /**
     * Getter for activity
     */
    get activity$(): Observable<InventoryActivities> {
        return this._activity.asObservable();
    }

    /**
     * Getter for activities
     */
    get activities$(): Observable<InventoryActivities[]> {
        return this._activities.asObservable();
    }

    /**
     * Getter for participantesActividades
     */
    get participantesActividades$(): Observable<InventoryParticipanteActividades[]> {
        return this._participantesActividades.asObservable();
    }

    /**
     * Getter for periodosActividades
     */
    get periodosActividades$(): Observable<InventoryProgramaActividades[]> {
        return this._periodosActividades.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get facultadesActividades
     */
    getFacultadesActividades(): Observable<InventoryFacultadActividades[]> {
        return this._httpClient.get<InventoryFacultadActividades[]>('api/apps/ecommerce/inventory/facultadesActividades').pipe(
            tap((facultadActividades) => {
                this._facultadesActividades.next(facultadActividades);
            })
        );
    }

    /**
     * Get clubesActividades
     */
    getClubesActividades(): Observable<InventoryClubActividades[]> {
        return this._httpClient.get<InventoryClubActividades[]>('api/apps/ecommerce/inventory/clubesActividades').pipe(
            tap((clubesActividades) => {
                this._clubesActividades.next(clubesActividades);
            })
        );
    }

    /**
     * Get activities
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getActivities(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ paginationActividades: InventoryPagination; activities: InventoryActivities[] }> {
        return this._httpClient.get<{ paginationActividades: InventoryPagination; activities: InventoryActivities[] }>('api/actividades', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._paginationActividades.next(response.paginationActividades);
                this._activities.next(response.activities);
            })
        );
    }

    /**
     * Get activity by id
     */
    getActivityById(id: string): Observable<InventoryActivities> {
        return this._activities.pipe(
            take(1),
            map((activities) => {

                // Find the activity
                const activity = activities.find(item => item.id === id) || null;

                // Update the activity
                this._activity.next(activity);

                // Return the activity
                return activity;
            }),
            switchMap((activity) => {

                if (!activity) {
                    return throwError('No se pudo encontrar la actividad con el id de ' + id + '.');
                }

                return of(activity);
            })
        );
    }

    /**
     * Create activity
     */
    createActivity(): Observable<InventoryActivities> {
        return this.activities$.pipe(
            take(1),
            switchMap(activities => this._httpClient.post<InventoryActivities>('api/apps/ecommerce/inventory/activity', {}).pipe(
                map((newActivity) => {

                    // Update the activities with the new activity
                    this._activities.next([newActivity, ...activities]);

                    // Return the new activity
                    return newActivity;
                })
            ))
        );
    }

    /**
     * Update activity
     *
     * @param id
     * @param activity
     */
    updateActivity(id: string, activity: InventoryActivities): Observable<InventoryActivities> {
        return this.activities$.pipe(
            take(1),
            switchMap(activities => this._httpClient.patch<InventoryActivities>('api/apps/ecommerce/inventory/activity', {
                id,
                activity
            }).pipe(
                map((updatedActivity) => {

                    // Find the index of the updated activity
                    const index = activities.findIndex(item => item.id === id);

                    // Update the activity
                    activities[index] = updatedActivity;

                    // Update the activities
                    this._activities.next(activities);

                    // Return the updated activity
                    return updatedActivity;
                }),
                switchMap(updatedActivity => this.activity$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the activity if it's selected
                        this._activity.next(updatedActivity);

                        // Return the updated activity
                        return updatedActivity;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the activity
     *
     * @param id
     */
    deleteActivity(id: string): Observable<boolean> {
        return this.activities$.pipe(
            take(1),
            switchMap(activities => this._httpClient.delete('api/apps/ecommerce/inventory/activity', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted activity
                    const index = activities.findIndex(item => item.id === id);

                    // Delete the activity
                    activities.splice(index, 1);

                    // Update the activities
                    this._activities.next(activities);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get participantesActividades
     */
    getParticipantesActividades(): Observable<InventoryParticipanteActividades[]> {
        return this._httpClient.get<InventoryParticipanteActividades[]>('api/apps/ecommerce/inventory/participantesActividades').pipe(
            tap((participantesActividades) => {
                this._participantesActividades.next(participantesActividades);
            })
        );
    }

    /**
     * Create participanteActividades
     *
     * @param participanteActividades
     */
/*     createParticipanteActividades(participanteActividades: InventoryParticipanteActividades): Observable<InventoryParticipanteActividades> {
        return this.participantesActividades$.pipe(
            take(1),
            switchMap(participantesActividades => this._httpClient.post<InventoryParticipanteActividades>('api/apps/ecommerce/inventory/participanteActividades', { participanteActividades }).pipe(
                map((newParticipanteActividades) => { */

                    // Update the participantesActividades with the new participanteActividades
    /*        this._participantesActividades.next([...participantesActividades, newParticipanteActividades]); */

                    // Return new participanteActividades from observable
      /*               return newParticipanteActividades;
                })
            ))
        );
    } */

    /**
     * Update the participanteActividades
     *
     * @param id
     * @param participanteActividades
     */
/*     updateParticipanteActividades(id: string, participanteActividades: InventoryParticipanteActividades): Observable<InventoryParticipanteActividades> {
        return this.participantesActividades$.pipe(
            take(1),
            switchMap(participantesActividades => this._httpClient.patch<InventoryParticipanteActividades>('api/apps/ecommerce/inventory/participanteActividades', {
                id,
                participanteActividades
            }).pipe(
                map((updatedParticipanteActividades) => { */

                    // Find the index of the updated participanteActividades
    /*         const index = participantesActividades.findIndex(item => item.id === id); */

                    // Update the participanteActividades
    /*          participantesActividades[index] = updatedParticipanteActividades; */

                    // Update the participantesActividades
    /*       this._participantesActividades.next(participantesActividades); */

                    // Return the updated participanteActividades
    /*                 return updatedParticipanteActividades;
                })
            ))
        );
    } */

    /**
     * Delete the participanteActividades
     *
     * @param id
     */
/*     deleteParticipanteActividades(id: string): Observable<boolean> {
        return this.participantesActividades$.pipe(
            take(1),
            switchMap(participantesActividades => this._httpClient.delete('api/apps/ecommerce/inventory/participanteActividades', { params: { id } }).pipe( */
    /*      map((isDeleted: boolean) => { */

                    // Find the index of the deleted participanteActividades
    /*             const index = participantesActividades.findIndex(item => item.id === id); */

                    // Delete the participanteActividades
    /*        participantesActividades.splice(index, 1); */

                    // Update the participantesActividades
    /*           this._participantesActividades.next(participantesActividades); */

                    // Return the deleted status
    /*        return isDeleted;
       }), */
         /*        filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.activities$.pipe(
                    take(1),
                    map((activities) => { */

                        // Iterate through the contacts
                 /*        activities.forEach((activity) => {

                            const participanteActividadesIndex = activity.participantesActividades.findIndex(participanteActividades => participanteActividades === id); */

                            // If the contact has the participanteActividades, remove it
       /*                      if (participanteActividadesIndex > -1) {
                                activity.participantesActividades.splice(participanteActividadesIndex, 1);
                            }
                        }); */

                        // Return the deleted status
  /*                       return isDeleted;
                    })
                ))
            ))
        );
    } */

    /**
     * Get periodosActividades
     */
    getProgramasActividades(): Observable<InventoryProgramaActividades[]> {
        return this._httpClient.get<InventoryProgramaActividades[]>('api/apps/ecommerce/inventory/periodosActividades').pipe(
            tap((periodosActividades) => {
                this._periodosActividades.next(periodosActividades);
            })
        );
    }

    /**
     * Update the avatar of the given contact
     *
     * @param id
     * @param avatar
     */
    /*uploadAvatar(id: string, avatar: File): Observable<Contact>
    {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<Contact>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {
                headers: {
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedContact) => {

                    // Find the index of the updated contact
                    const index = contacts.findIndex(item => item.id === id);

                    // Update the contact
                    contacts[index] = updatedContact;

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the updated contact
                    return updatedContact;
                }),
                switchMap(updatedContact => this.contact$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the contact if it's selected
                        this._contact.next(updatedContact);

                        // Return the updated contact
                        return updatedContact;
                    })
                ))
            ))
        );
    }*/
}
