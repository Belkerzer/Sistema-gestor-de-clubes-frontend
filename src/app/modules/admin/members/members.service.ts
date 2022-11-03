import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { InventoryCarrera, InventoryPeriodo, InventoryPagination, InventoryMember, InventoryClub, InventorySexo, InventoryFacultad } from 'app/modules/admin/members/members.types';

@Injectable({
    providedIn: 'root'
})
export class MembersService {
    // Private
    private _carreras: BehaviorSubject<InventoryCarrera[] | null> = new BehaviorSubject(null);
    private _periodos: BehaviorSubject<InventoryPeriodo[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _participante: BehaviorSubject<InventoryMember | null> = new BehaviorSubject(null);
    private _participantes: BehaviorSubject<InventoryMember[] | null> = new BehaviorSubject(null);
    private _clubes: BehaviorSubject<InventoryClub[] | null> = new BehaviorSubject(null);
    private _sexos: BehaviorSubject<InventorySexo[] | null> = new BehaviorSubject(null);
    private _facultades: BehaviorSubject<InventoryFacultad[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for carreras
     */
    get carreras$(): Observable<InventoryCarrera[]> {
        return this._carreras.asObservable();
    }

    /**
     * Getter for periodos
     */
    get periodos$(): Observable<InventoryPeriodo[]> {
        return this._periodos.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    /**
     * Getter for parcitipante
     */
    get participante$(): Observable<InventoryMember> {
        return this._participante.asObservable();
    }

    /**
     * Getter for participantes
     */
    get participantes$(): Observable<InventoryMember[]> {
        return this._participantes.asObservable();
    }

    /**
     * Getter for clubes
     */
    get clubes$(): Observable<InventoryClub[]> {
        return this._clubes.asObservable();
    }

    /**
     * Getter for sexos
     */
    get sexos$(): Observable<InventorySexo[]> {
        return this._sexos.asObservable();
    }

    /**
     * Getter for facultades
     */
    get facultades$(): Observable<InventoryFacultad[]> {
        return this._facultades.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get carreras
     */
    getCarreras(): Observable<InventoryCarrera[]> {
        return this._httpClient.get<InventoryCarrera[]>('api/apps/ecommerce/inventory/carreras').pipe(
            tap((carreras) => {
                this._carreras.next(carreras);
            })
        );
    }

    /**
     * Get periodos
     */
    getPeriodos(): Observable<InventoryPeriodo[]> {
        return this._httpClient.get<InventoryPeriodo[]>('api/apps/ecommerce/inventory/periodos').pipe(
            tap((periodos) => {
                this._periodos.next(periodos);
            })
        );
    }

    /**
     * Get facultades
     */
    getFacultades(): Observable<InventoryFacultad[]> {
        return this._httpClient.get<InventoryFacultad[]>('api/apps/ecommerce/inventory/facultades').pipe(
            tap((facultades) => {
                this._facultades.next(facultades);
            })
        );
    }

    /**
     * Get participantes
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getParticipantes(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: InventoryPagination; participantes: InventoryMember[] }> {
        return this._httpClient.get<{ pagination: InventoryPagination; participantes: InventoryMember[] }>('api/participantes', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._participantes.next(response.participantes);
            })
        );
    }

    /**
     * Get participante by id
     */
    getParticipanteById(id: string): Observable<InventoryMember> {
        return this._participantes.pipe(
            take(1),
            map((participantes) => {

                // Find the participante
                const participante = participantes.find(item => item.id === id) || null;

                // Update the participante
                this._participante.next(participante);

                // Return the participante
                return participante;
            }),
            switchMap((participante) => {

                if (!participante) {
                    return throwError('No se pudo encontrar el participante con el id de ' + id + '.');
                }

                return of(participante);
            })
        );
    }

    /**
     * Create participante
     */
    createParticipante(): Observable<InventoryMember> {
        return this.participantes$.pipe(
            take(1),
            switchMap(participantes => this._httpClient.post<InventoryMember>('api/apps/ecommerce/inventory/participante', {}).pipe(
                map((newParticipante) => {

                    // Update the participantes with the new participante
                    this._participantes.next([newParticipante, ...participantes]);

                    // Return the new participante
                    return newParticipante;
                })
            ))
        );
    }

    /**
     * Update participante
     *
     * @param id
     * @param participante
     */
    updateParticipante(id: string, participante: InventoryMember): Observable<InventoryMember> {
        return this.participantes$.pipe(
            take(1),
            switchMap(participantes => this._httpClient.patch<InventoryMember>('api/apps/ecommerce/inventory/participante', {
                id,
                participante
            }).pipe(
                map((updatedParticipante) => {

                    // Find the index of the updated participante
                    const index = participantes.findIndex(item => item.id === id);

                    // Update the participante
                    participantes[index] = updatedParticipante;

                    // Update the participantes
                    this._participantes.next(participantes);

                    // Return the updated participante
                    return updatedParticipante;
                }),
                switchMap(updatedParticipante => this.participante$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the participante if it's selected
                        this._participante.next(updatedParticipante);

                        // Return the updated participante
                        return updatedParticipante;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the participante
     *
     * @param id
     */
    deleteParticipante(id: string): Observable<boolean> {
        return this.participantes$.pipe(
            take(1),
            switchMap(participantes => this._httpClient.delete('api/apps/ecommerce/inventory/participante', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted participante
                    const index = participantes.findIndex(item => item.id === id);

                    // Delete the participante
                    participantes.splice(index, 1);

                    // Update the participante
                    this._participantes.next(participantes);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get clubes
     */
    getClubes(): Observable<InventoryClub[]> {
        return this._httpClient.get<InventoryClub[]>('api/apps/ecommerce/inventory/clubes').pipe(
            tap((clubes) => {
                this._clubes.next(clubes);
            })
        );
    }

    /**
     * Create club
     *
     * @param club
     */
/*     createClub(club: InventoryClub): Observable<InventoryClub> {
        return this.clubes$.pipe(
            take(1),
            switchMap(clubes => this._httpClient.post<InventoryClub>('api/apps/ecommerce/inventory/club', { club }).pipe(
                map((newClub) => { */

                    // Update the clubes with the new club
    /*        this._clubes.next([...clubes, newClub]); */

                    // Return new club from observable
/*                     return newClub;
                })
            ))
        );
    } */

    /**
     * Update the club
     *
     * @param id
     * @param club
     */
/*     updateClub(id: string, club: InventoryClub): Observable<InventoryClub> {
        return this.clubes$.pipe(
            take(1),
            switchMap(clubes => this._httpClient.patch<InventoryClub>('api/apps/ecommerce/inventory/club', {
                id,
                club
            }).pipe(
                map((updatedClub) => { */

                    // Find the index of the updated club
    /*     const index = clubes.findIndex(item => item.id === id); */

                    // Update the club
    /*         clubes[index] = updatedClub; */

                    // Update the clubes
    /*      this._clubes.next(clubes); */

                    // Return the updated club
/*                     return updatedClub;
                })
            ))
        );
    } */

    /**
     * Delete the club
     *
     * @param id
     */
/*     deleteClub(id: string): Observable<boolean> {
        return this.clubes$.pipe(
            take(1),
            switchMap(clubes => this._httpClient.delete('api/apps/ecommerce/inventory/club', { params: { id } }).pipe( 
                map((isDeleted: boolean) => {*/

                    // Find the index of the deleted club
    /*                 const index = clubes.findIndex(item => item.id === id); */

                    // Delete the club
    /*         clubes.splice(index, 1); */

                    // Update the clubes
    /*         this._clubes.next(clubes); */

                    // Return the deleted status
    /*       return isDeleted;
      }), */
          /*       filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.participantes$.pipe(
                    take(1),
                    map((participantes) => { */

                        // Iterate through the contacts
     /*                    participantes.forEach((participante) => {

                            const clubIndex = participante.clubes.findIndex(club => club === id); */

                            // If the contact has the club, remove it
                  /*           if (clubIndex > -1) {
                                participante.clubes.splice(clubIndex, 1);
                            }
                        }); */

                        // Return the deleted status
/*                         return isDeleted;
                    })
                ))
            ))
        );
    } */

    /**
     * Get sexos
     */
    getSexos(): Observable<InventorySexo[]> {
        return this._httpClient.get<InventorySexo[]>('api/apps/ecommerce/inventory/sexos').pipe(
            tap((sexos) => {
                this._sexos.next(sexos);
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
