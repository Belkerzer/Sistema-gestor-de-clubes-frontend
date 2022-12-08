import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Contact, Country, Club, Rol } from './contacts.types';


@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    // Private
    private _roles: BehaviorSubject<Rol[] | null> = new BehaviorSubject(null);
    private _contact: BehaviorSubject<Contact | null> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<Contact[] | null> = new BehaviorSubject(null);
    private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(null);
    private _clubes: BehaviorSubject<Club[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for contact
     */
    get contact$(): Observable<Contact> {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<Contact[]> {
        return this._contacts.asObservable();
    }

    /**
     * Getter for roles
     */
    get roles$(): Observable<Rol[]> {
        return this._roles.asObservable();
    }

    /**
     * Getter for countries
     */
    get countries$(): Observable<Country[]> {
        return this._countries.asObservable();
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
     * Get contacts
     */
    getContacts(): Observable<Contact[]> {
        return this._httpClient.get<Contact[]>('api/apps/contacts/all').pipe(
            tap((contacts) => {
                this._contacts.next(contacts);
            })
        );
    }

    /**
 * Get roles
 */
    getRoles(): Observable<Rol[]> {
        return this._httpClient.get<Rol[]>('api/apps/ecommerce/inventory/roles').pipe(
            tap((roles => {
                this._roles.next(roles);
            })
            )
        );
    }

    /**
     * Search contacts with given query
     *
     * @param query
     */
    searchContacts(query: string): Observable<Contact[]> {
        return this._httpClient.get<Contact[]>('api/apps/contacts/search', {
            params: { query }
        }).pipe(
            tap((contacts) => {
                this._contacts.next(contacts);
            })
        );
    }

    /**
     * Get contact by id
     */
    getContactById(id: string): Observable<Contact> {
        return this._contacts.pipe(
            take(1),
            map((contacts) => {

                // Find the contact
                const contact = contacts.find(item => item.id === id) || null;

                // Update the contact
                this._contact.next(contact);

                // Return the contact
                return contact;
            }),
            switchMap((contact) => {

                if (!contact) {
                    return throwError('Could not found contact with id of ' + id + '!');
                }

                return of(contact);
            })
        );
    }

    /**
     * Create contact
     */
    createContact(): Observable<Contact> {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<Contact>('api/apps/contacts/contact', {}).pipe(
                map((newContact) => {

                    // Update the contacts with the new contact
                    this._contacts.next([newContact, ...contacts]);

                    // Return the new contact
                    return newContact;
                })
            ))
        );
    }

    /**
     * Update contact
     *
     * @param id
     * @param contact
     */
    updateContact(id: string, contact: Contact): Observable<Contact> {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.patch<Contact>('api/apps/contacts/contact', {
                id,
                contact
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
    }

    /**
     * Delete the contact
     *
     * @param id
     */
    deleteContact(id: string): Observable<boolean> {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.delete('api/apps/contacts/contact', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted contact
                    const index = contacts.findIndex(item => item.id === id);

                    // Delete the contact
                    contacts.splice(index, 1);

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get countries
     */
    getCountries(): Observable<Country[]> {
        return this._httpClient.get<Country[]>('api/apps/contacts/countries').pipe(
            tap((countries) => {
                this._countries.next(countries);
            })
        );
    }

    /**
     * Get clubes
     */
    getClubes(): Observable<Club[]> {
        return this._httpClient.get<Club[]>('api/apps/contacts/clubes').pipe(
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
    createClub(club: Club): Observable<Club> {
        return this.clubes$.pipe(
            take(1),
            switchMap(clubes => this._httpClient.post<Club>('api/apps/contacts/club', { club }).pipe(
                map((newClub) => {

                    // Update the clubes with the new club
                    this._clubes.next([...clubes, newClub]);

                    // Return new club from observable
                    return newClub;
                })
            ))
        );
    }

    /**
     * Update the club
     *
     * @param id
     * @param club
     */
    updateClub(id: string, club: Club): Observable<Club> {
        return this.clubes$.pipe(
            take(1),
            switchMap(clubes => this._httpClient.patch<Club>('api/apps/contacts/club', {
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
    }

    /**
     * Delete the club
     *
     * @param id
     */
    deleteClub(id: string): Observable<boolean> {
        return this.clubes$.pipe(
            take(1),
            switchMap(clubes => this._httpClient.delete('api/apps/contacts/club', { params: { id } }).pipe(
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
                switchMap(isDeleted => this.contacts$.pipe(
                    take(1),
                    map((contacts) => {

                        // Iterate through the contacts
                        contacts.forEach((contact) => {

                            const clubIndex = contact.clubes.findIndex(club => club === id);

                            // If the contact has the club, remove it
                            if (clubIndex > -1) {
                                contact.clubes.splice(clubIndex, 1);
                            }
                        });

                        // Return the deleted status
                        return isDeleted;
                    })
                ))
            ))
        );
    }

    /**
     * Update the avatar of the given contact
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(id: string, avatar: File): Observable<Contact> {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<Contact>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
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
    }
}
