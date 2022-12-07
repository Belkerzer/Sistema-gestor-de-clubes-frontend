import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Partner, Rol, Club } from './partners.types';


@Injectable({
    providedIn: 'root'
})
export class PartnersService {
    // Private
    private _partner: BehaviorSubject<Partner | null> = new BehaviorSubject(null);
    private _partners: BehaviorSubject<Partner[] | null> = new BehaviorSubject(null);
    /*     private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(null);*/
    private _clubes: BehaviorSubject<Club[] | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Rol[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for partner
     */
    get partner$(): Observable<Partner> {
        return this._partner.asObservable();
    }

    /**
     * Getter for partners
     */
    get partners$(): Observable<Partner[]> {
        return this._partners.asObservable();
    }

    /**
     * Getter for countries
     */
    /*     get countries$(): Observable<Country[]> {
            return this._countries.asObservable();
        } */

    /**
     * Getter for countries
     */
    get roles$(): Observable<Rol[]> {
        return this._roles.asObservable();
    }

    /**
     * Getter for clubes
     */
    get clubes$(): Observable<Club[]> {
        return this._clubes.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getRoles(): Observable<Rol[]> {
        return this._httpClient.get<Rol[]>('api/apps/partners/roles').pipe(
            tap((roles) => {
                this._roles.next(roles);
            })
        );
    }

    /**
     * Get partners
     */
    getPartners(): Observable<Partner[]> {
        return this._httpClient.get<Partner[]>('api/apps/partners/all').pipe(
            tap((partners) => {
                this._partners.next(partners);
            })
        );
    }

    /**
     * Search partners with given query
     *
     * @param query
     */
    searchPartners(query: string): Observable<Partner[]> {
        return this._httpClient.get<Partner[]>('api/apps/partners/search', {
            params: { query }
        }).pipe(
            tap((partners) => {
                this._partners.next(partners);
            })
        );
    }

    /**
     * Get partner by id
     */
    getPartnerById(id: string): Observable<Partner> {
        return this._partners.pipe(
            take(1),
            map((partners) => {

                // Find the partner
                const partner = partners.find(item => item.id === id) || null;

                // Update the partner
                this._partner.next(partner);

                // Return the partner
                return partner;
            }),
            switchMap((partner) => {

                if (!partner) {
                    return throwError('No se pudo encontrar el usuario con el id de ' + id + '.');
                }

                return of(partner);
            })
        );
    }

    /**
     * Create partner
     */
    createPartner(): Observable<Partner> {
        return this.partners$.pipe(
            take(1),
            switchMap(partners => this._httpClient.post<Partner>('api/apps/partners/partner', {}).pipe(
                map((newPartner) => {

                    // Update the partners with the new partner
                    this._partners.next([newPartner, ...partners]);

                    // Return the new partner
                    return newPartner;
                })
            ))
        );
    }

    /**
     * Update partner
     *
     * @param id
     * @param partner
     */
    updatePartner(id: string, partner: Partner): Observable<Partner> {
        return this.partners$.pipe(
            take(1),
            switchMap(partners => this._httpClient.patch<Partner>('api/apps/partners/partner', {
                id,
                partner
            }).pipe(
                map((updatedPartner) => {

                    // Find the index of the updated partner
                    const index = partners.findIndex(item => item.id === id);

                    // Update the partner
                    partners[index] = updatedPartner;

                    // Update the partners
                    this._partners.next(partners);

                    // Return the updated partner
                    return updatedPartner;
                }),
                switchMap(updatedPartner => this.partner$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the partner if it's selected
                        this._partner.next(updatedPartner);

                        // Return the updated partner
                        return updatedPartner;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the partner
     *
     * @param id
     */
    deletePartner(id: string): Observable<boolean> {
        return this.partners$.pipe(
            take(1),
            switchMap(partners => this._httpClient.delete('api/apps/partners/partner', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted partner
                    const index = partners.findIndex(item => item.id === id);

                    // Delete the partner
                    partners.splice(index, 1);

                    // Update the partners
                    this._partners.next(partners);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get countries
     */
    /*     getCountries(): Observable<Country[]> {
            return this._httpClient.get<Country[]>('api/apps/partners/countries').pipe(
                tap((countries) => {
                    this._countries.next(countries);
                })
            );
        } */

    /**
     * Get clubes
     */
    getClubes(): Observable<Club[]> {
        return this._httpClient.get<Club[]>('api/apps/partners/clubes').pipe(
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
    /*     createClub(club: Club): Observable<Club> {
            return this.clubes$.pipe(
                take(1),
                switchMap(clubes => this._httpClient.post<Club>('api/apps/partners/club', { club }).pipe(
                    map((newClub) => {
    
                        // Update the clubes with the new club
                        this._clubes.next([...clubes, newClub]);
    
                        // Return new club from observable
                        return newClub;
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
    /*     updateClub(id: string, club: Club): Observable<Club> {
            return this.clubes$.pipe(
                take(1),
                switchMap(clubes => this._httpClient.patch<Club>('api/apps/partners/club', {
                    id,
                    club
                }).pipe(
                    map((updatedClub) => {
    
                        // Find the index of the updated club
                        const index = clubes.findIndex(item => item.id === id);
    
                        // Update the club
                        clubes[index] = updatedClub;
    
                        // Update the clubes
                        this._clubes.next(clubes);
    
                        // Return the updated club
                        return updatedClub;
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
                switchMap(clubes => this._httpClient.delete('api/apps/partners/club', { params: { id } }).pipe(
                    map((isDeleted: boolean) => {
    
                        // Find the index of the deleted club
                        const index = clubes.findIndex(item => item.id === id);
    
                        // Delete the club
                        clubes.splice(index, 1);
    
                        // Update the clubes
                        this._clubes.next(clubes);
    
                        // Return the deleted status
                        return isDeleted;
                    }),
                    filter(isDeleted => isDeleted),
                    switchMap(isDeleted => this.partners$.pipe(
                        take(1),
                        map((partners) => {
    
                            // Iterate through the partners
                            partners.forEach((partner) => {
    
                                const clubIndex = partner.clubes.findIndex(club => club === id);
    
                                // If the partner has the club, remove it
                                if (clubIndex > -1) {
                                    partner.clubes.splice(clubIndex, 1);
                                }
                            });
    
                            // Return the deleted status
                            return isDeleted;
                        })
                    ))
                ))
            );
        } */

    /**
     * Update the avatar of the given partner
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(id: string, avatar: File): Observable<Partner> {
        return this.partners$.pipe(
            take(1),
            switchMap(partners => this._httpClient.post<Partner>('api/apps/partners/avatar', {
                id,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedPartner) => {

                    // Find the index of the updated partner
                    const index = partners.findIndex(item => item.id === id);

                    // Update the partner
                    partners[index] = updatedPartner;

                    // Update the partners
                    this._partners.next(partners);

                    // Return the updated partner
                    return updatedPartner;
                }),
                switchMap(updatedPartner => this.partner$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the partner if it's selected
                        this._partner.next(updatedPartner);

                        // Return the updated partner
                        return updatedPartner;
                    })
                ))
            ))
        );
    }
}
