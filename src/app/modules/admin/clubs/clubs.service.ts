import {ParticipantesResponse} from '../members/members.service';

export interface DocenteResponse {
    id:                number;
    nombres:           string;
    correoElectronico: string;
    roles:             Roles;
    idUsuario:         number;
}

export interface Roles {
    rol:   string;
    idRol: number;
}


export interface ClubesResponse {
    id:            number;
    club:          string;
    descripcion:   string;
    facultades:    Facultades;
    programas:     Programas;
    departamentos: Departamentos;
    tipos:         Tipos;
    participantes: ParticipantesResponse[];
    docentes:      Docentes[];
    fechaInicio:   string;
    fechaCierre:   string;
    fechaCreacion: string;
}

export interface Departamentos {
    departamento: string;
    id:           number;
}

export interface Facultades {
    facultad: string;
    id:       number;
}

export interface Programas {
    programa:   string;
    id: number;
}

export interface Docentes {
    docente:   string;
    id: number;
}

export interface Tipos {
    tipo:   string;
    id: number;
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { InventoryFacultadClub, InventoryLiderEstudiantil, InventoryPagination, InventoryClubs, InventoryDocenteTutor, InventoryPrograma, InventoryParticipanteClubes } from 'app/modules/admin/clubs/clubs.types';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClubsService {
    apiUrl = environment.apiBackend;
    // Private
    private _facultadesClub: BehaviorSubject<InventoryFacultadClub[] | null> = new BehaviorSubject(null);
    private _lideresEstudiantiles: BehaviorSubject<InventoryLiderEstudiantil[] | null> = new BehaviorSubject(null);
    private _paginationClubsClubs: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _club: BehaviorSubject<ClubesResponse | null> = new BehaviorSubject(null);
    private _clubs: BehaviorSubject<ClubesResponse[] | null> = new BehaviorSubject(null);
    private _docentesTutores: BehaviorSubject<DocenteResponse[] | null> = new BehaviorSubject(null);
    private _participantesClubes: BehaviorSubject<InventoryParticipanteClubes[] | null> = new BehaviorSubject(null);
    private _programas: BehaviorSubject<InventoryPrograma[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for facultadesClub
     */
    get facultadesClub$(): Observable<InventoryFacultadClub[]> {
        return this._facultadesClub.asObservable();
    }

    /**
     * Getter for lideresEstudiantiles
     */
    get lideresEstudiantiles$(): Observable<InventoryLiderEstudiantil[]> {
        return this._lideresEstudiantiles.asObservable();
    }

    /**
     * Getter for paginationClubs
     */
    get paginationClubs$(): Observable<InventoryPagination> {
        return this._paginationClubsClubs.asObservable();
    }

    /**
     * Getter for club
     */
    get club$(): Observable<ClubesResponse> {
        return this._club.asObservable();
    }

    /**
     * Getter for participantesClubes
     */
    get participantesClubes$(): Observable<InventoryParticipanteClubes[]> {
        return this._participantesClubes.asObservable();
    }

    /**
     * Getter for clubs
     */
    get clubs$(): Observable<ClubesResponse[]> {
        return this._clubs.asObservable();
    }

    /**
     * Getter for docentesTutores
     */
    get docentesTutores$(): Observable<DocenteResponse[]> {
        return this._docentesTutores.asObservable();
    }

    /**
     * Getter for programas
     */
    get programas$(): Observable<InventoryPrograma[]> {
        return this._programas.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get facultadesClub
     */
    getFacultadesClub(): Observable<InventoryFacultadClub[]> {
        return this._httpClient.get<InventoryFacultadClub[]>('api/apps/ecommerce/inventory/facultadesClub').pipe(
            tap((facultadesClub) => {
                this._facultadesClub.next(facultadesClub);
            })
        );
    }

    /**
     * Get Líderes Estudiantiles
     */
    getLideresEstudiantiles(): Observable<InventoryLiderEstudiantil[]> {
        return this._httpClient.get<InventoryLiderEstudiantil[]>('api/apps/ecommerce/inventory/lideresEstudiantiles').pipe(
            tap((lideresEstudiantiles) => {
                this._lideresEstudiantiles.next(lideresEstudiantiles);
            })
        );
    }

    /**
     * Get clubs
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getClubs(termino: string = ''):
        Observable<ClubesResponse[]> {
        return this._httpClient.get<ClubesResponse[]>(`${this.apiUrl}/clubes`, {
            params: {
                // page: '' + page,
                // size: '' + size,
                // sort,
                // order,
                termino
            }
        }).pipe(
            tap((response) => {
                // this._paginationClubsClubs.next(response.paginationClubs);
                this._clubs.next(response);
            })
        );
    }

    /**
     * Get club by id
     */
    getClubById(id: number): Observable<ClubesResponse> {
        return this._clubs.pipe(
            take(1),
            map((clubs) => {

                // Find the club
                const club = clubs.find(item => item.id === id) || null;

                // Update the club
                this._club.next(club);

                // Return the club
                return club;
            }),
            switchMap((club) => {

                if (!club) {
                    return throwError('No se pudo encontrar el club con el id de ' + id + '.');
                }

                return of(club);
            })
        );
    }

    /**
     * Create club
     */
    createClub(): Observable<InventoryClubs> {
        return this.clubs$.pipe(
            take(1),
            switchMap(clubs => this._httpClient.post<InventoryClubs>('api/apps/ecommerce/inventory/club', {}).pipe(
                map(newClub =>

                    // Update the clubs with the new club
                    // this._clubs.next([newClub, ...clubs]);

                    // Return the new club
                     newClub
                )
            ))
        );
    }

    /**
     * Update club
     *
     * @param id
     * @param club
     */
    // updateClub(id: string, club: InventoryClubs): Observable<InventoryClubs> {
    //     return this.clubs$.pipe(
    //         take(1),
    //         switchMap(clubs => this._httpClient.patch<InventoryClubs>('api/apps/ecommerce/inventory/club', {
    //             id,
    //             club
    //         }).pipe(
    //             map((updatedClub) => {
    //
    //                 // Find the index of the updated club
    //                 const index = clubs.findIndex(item => item.id === id);
    //
    //                 // Update the club
    //                 clubs[index] = updatedClub;
    //
    //                 // Update the clubs
    //                 this._clubs.next(clubs);
    //
    //                 // Return the updated club
    //                 return updatedClub;
    //             }),
    //             switchMap(updatedClub => this.club$.pipe(
    //                 take(1),
    //                 filter(item => item && item.id === id),
    //                 tap(() => {
    //
    //                     // Update the club if it's selected
    //                     this._club.next(updatedClub);
    //
    //                     // Return the updated club
    //                     return updatedClub;
    //                 })
    //             ))
    //         ))
    //     );
    // }

    /**
     * Delete the club
     *
     * @param id
     */
    // deleteClub(id: string): Observable<boolean> {
    //     return this.clubs$.pipe(
    //         take(1),
    //         switchMap(clubs => this._httpClient.delete('api/apps/ecommerce/inventory/club', { params: { id } }).pipe(
    //             map((isDeleted: boolean) => {
    //
    //                 // Find the index of the deleted club
    //                 const index = clubs.findIndex(item => item.id === id);
    //
    //                 // Delete the club
    //                 clubs.splice(index, 1);
    //
    //                 // Update the clubs
    //                 this._clubs.next(clubs);
    //
    //                 // Return the deleted status
    //                 return isDeleted;
    //             })
    //         ))
    //     );
    // }

    /**
     * Get participantesClubes
     */
    getParticipantesClubes(): Observable<InventoryParticipanteClubes[]> {
        return this._httpClient.get<InventoryParticipanteClubes[]>('api/apps/ecommerce/inventory/participantesClubes').pipe(
            tap((participantesClubes) => {
                this._participantesClubes.next(participantesClubes);
            })
        );
    }

    /**
     * Get Docentes Tutores
     */
    getDocentesTutores(): Observable<DocenteResponse[]> {
        return this._httpClient.get<DocenteResponse[]>('api/apps/ecommerce/inventory/docentesTutores').pipe(
            tap((docentesTutores) => {
                this._docentesTutores.next(docentesTutores);
            })
        );
    }

    /**
     * Create Docente Tutor
     *
     * @param docenteTutor
     */
/*     createDocenteTutor(docenteTutor: InventoryDocenteTutor): Observable<InventoryDocenteTutor> {
        return this.docentesTutores$.pipe(
            take(1),
            switchMap(docentesTutores => this._httpClient.post<InventoryDocenteTutor>('api/apps/ecommerce/inventory/docenteTutor1', { docenteTutor }).pipe(
                map((newDocenteTutor) => { */

                    // Update the docentesTutores with the new docenteTutor
    /*   this._docentesTutores.next([...docentesTutores, newDocenteTutor]); */

                    // Return new docenteTutor from observable
  /*                   return newDocenteTutor;
                })
            ))
        );
    }
 */
    /**
     * Update the Docente Tutor
     *
     * @param id
     * @param docenteTutor
     */
  /*   updateDocenteTutor(id: string, docenteTutor: InventoryDocenteTutor): Observable<InventoryDocenteTutor> {
        return this.docentesTutores$.pipe(
            take(1),
            switchMap(docentesTutores => this._httpClient.patch<InventoryDocenteTutor>('api/apps/ecommerce/inventory/docenteTutor1', {
                id,
                docenteTutor
            }).pipe(
                map((updatedDocenteTutor) => { */

                    // Find the index of the updated docenteTutor
    /*        const index = docentesTutores.findIndex(item => item.id === id); */

                    // Update the docenteTutor
    /*          docentesTutores[index] = updatedDocenteTutor; */

                    // Update the docentesTutores
    /*     this._docentesTutores.next(docentesTutores); */

                    // Return the updated docenteTutor
     /*                return updatedDocenteTutor;
                })
            ))
        );
    } */

    /**
     * Delete the Docente Tutor
     *
     * @param id
     */
/*     deleteDocenteTutor(id: string): Observable<boolean> {
        return this.docentesTutores$.pipe(
            take(1),
            switchMap(docentesTutores => this._httpClient.delete('api/apps/ecommerce/inventory/docenteTutor1', { params: { id } }).pipe(
                map((isDeleted: boolean) => { */

                    // Find the index of the deleted docenteTutor
    /*      const index = docentesTutores.findIndex(item => item.id === id); */

                    // Delete the docenteTutor
    /*         docentesTutores.splice(index, 1); */

                    // Update the docentesTutores
    /*    this._docentesTutores.next(docentesTutores); */

                    // Return the deleted status
    /*       return isDeleted;
      }), */
          /*       filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.clubs$.pipe(
                    take(1),
                    map((clubs) => { */

                        // Iterate through the contacts
    /*            clubs.forEach((club) => { */

    /*       const docenteTutorIndex = club.docentesTutores.findIndex(docenteTutor => docenteTutor === id); */

                            // If the contact has the docenteTutor, remove it
               /*              if (docenteTutorIndex > -1) {
                                club.docentesTutores.splice(docenteTutorIndex, 1);
                            }
                        }); */

                        // Return the deleted status
   /*                      return isDeleted;
                    })
                ))
            ))
        );
    } */

    /**
     * Get programas
     */
    getProgramas(): Observable<InventoryPrograma[]> {
        return this._httpClient.get<InventoryPrograma[]>('api/apps/ecommerce/inventory/programas').pipe(
            tap((programas) => {
                this._programas.next(programas);
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
