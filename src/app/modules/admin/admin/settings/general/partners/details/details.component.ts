import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PartnersService } from '../partners.service';
import { Club, Partner, Rol } from '../partners.types';
import { PartnersListComponent } from '../list/list.component';
import { UserService } from 'app/core/user/user.service';
import { BooleanInput } from '@angular/cdk/coercion';
import { User } from 'app/core/user/user.types';


@Component({
    selector: 'users-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class PartnersDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('clubesPanel') private _clubesPanel: TemplateRef<any>;
    @ViewChild('clubesPanelOrigin') private _clubesPanelOrigin: ElementRef;

    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    editMode: boolean = false;
    user: User;
    clubes: Club[];
    /* clubesEditMode: boolean = false; */
    filteredClubes: Club[];
    partner: Partner;
    roles: Rol[];
    partnerForm: FormGroup;
    partners: Partner[];
    /* countries: Country[]; */
    private _clubesPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _partnersListComponent: PartnersListComponent,
        private _partnersService: PartnersService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Open the drawer
        this._partnersListComponent.matDrawer.open();

        // Create the partner form
        this.partnerForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            name: ['', [Validators.required]],
            email: ['', Validators.email],
            phoneNumbers: this._formBuilder.array([]),
            title: [''],
            company: [''],
            birthday: [null],
            address: [null],
            username: [''],
            clubes: [[]],
            rol: [''],
        });

        // Get the brands
        this._partnersService.roles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((roles: Rol[]) => {

                // Update the brands
                this.roles = roles;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the partners
        this._partnersService.partners$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((partners: Partner[]) => {
                this.partners = partners;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the partner
        this._partnersService.partner$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((partner: Partner) => {

                // Open the drawer in case it is closed
                this._partnersListComponent.matDrawer.open();

                // Get the partner
                this.partner = partner;

                // Clear the emails and phoneNumbers form arrays

                /*   (this.partnerForm.get('phoneNumbers') as FormArray).clear(); */

                // Patch values to the form
                /*       this.partnerForm.patchValue(partner); */

                // Setup the phone numbers form array
                /*           const phoneNumbersFormGroups = [];
          
                          if (partner.phoneNumbers.length > 0) { */
                // Iterate through them
                /*      partner.phoneNumbers.forEach((phoneNumber) => { */

                // Create an email form group
                /*               phoneNumbersFormGroups.push(
                                  this._formBuilder.group({
                                      country: [phoneNumber.country],
                                      phoneNumber: [phoneNumber.phoneNumber],
                                      label: [phoneNumber.label]
                                  })
                              );
                          });
                      }
                      else { */
                // Create a phone number form group
                /*                phoneNumbersFormGroups.push(
                                   this._formBuilder.group({
                                       country: ['us'],
                                       phoneNumber: [''],
                                       label: ['']
                                   })
                               );
                           } */

                // Add the phone numbers form groups to the phone numbers form array
                /*             phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
                                (this.partnerForm.get('phoneNumbers') as FormArray).push(phoneNumbersFormGroup);
                            }); */

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the country telephone codes
        /*    this._partnersService.countries$
               .pipe(takeUntil(this._unsubscribeAll))
               .subscribe((codes: Country[]) => {
                   this.countries = codes; */

        // Mark for check
        /*             this._changeDetectorRef.markForCheck();
                }); */

        // Get the clubes
        this._partnersService.clubes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((clubes: Club[]) => {
                this.clubes = clubes;
                this.filteredClubes = clubes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if (this._clubesPanelOverlayRef) {
            this._clubesPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._partnersListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        }
        else {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the partner
     */
    updatePartner(): void {
        // Get the partner object
        const partner = this.partnerForm.getRawValue();

        // Go through the partner object and clear empty values
        partner.emails = partner.emails.filter(email => email.email);

        partner.phoneNumbers = partner.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

        // Update the partner on the server
        this._partnersService.updatePartner(partner.id, partner).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    /**
     * Delete the partner
     */
    deletePartner(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar usuario',
            message: '¿Está seguro de que quiere eliminar este usuario? Esta acción no se puede deshacer.',
            actions: {
                cancel: {
                    label: 'Cancelar'
                },
                confirm: {
                    label: 'Eliminar'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the current partner's id
                const id = this.partner.id;

                // Get the next/previous partner's id
                const currentPartnerIndex = this.partners.findIndex(item => item.id === id);
                const nextPartnerIndex = currentPartnerIndex + ((currentPartnerIndex === (this.partners.length - 1)) ? -1 : 1);
                const nextPartnerId = (this.partners.length === 1 && this.partners[0].id === id) ? null : this.partners[nextPartnerIndex].id;

                // Delete the partner
                this._partnersService.deletePartner(id)
                    .subscribe((isDeleted) => {

                        // Return if the partner wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next partner if available
                        if (nextPartnerId) {
                            this._router.navigate(['../', nextPartnerId], { relativeTo: this._activatedRoute });
                        }
                        // Otherwise, navigate to the parent
                        else {
                            this._router.navigate(['../'], { relativeTo: this._activatedRoute });
                        }

                        // Toggle the edit mode off
                        this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

    }

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        // Upload the avatar
        this._partnersService.uploadAvatar(this.partner.id, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.partnerForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the partner
        this.partner.avatar = null;
    }

    /**
     * Open clubes panel
     */
    openClubesPanel(): void {
        // Create the overlay
        this._clubesPanelOverlayRef = this._overlay.create({
            backdropClass: '',
            hasBackdrop: true,
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._clubesPanelOrigin.nativeElement)
                .withFlexibleDimensions(true)
                .withViewportMargin(64)
                .withLockedPosition(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    }
                ])
        });

        // Subscribe to the attachments observable
        this._clubesPanelOverlayRef.attachments().subscribe(() => {

            // Add a class to the origin
            this._renderer2.addClass(this._clubesPanelOrigin.nativeElement, 'panel-opened');

            // Focus to the search input once the overlay has been attached
            this._clubesPanelOverlayRef.overlayElement.querySelector('input').focus();
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._clubesPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._clubesPanelOverlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._clubesPanelOverlayRef.backdropClick().subscribe(() => {

            // Remove the class from the origin
            this._renderer2.removeClass(this._clubesPanelOrigin.nativeElement, 'panel-opened');

            // If overlay exists and attached...
            if (this._clubesPanelOverlayRef && this._clubesPanelOverlayRef.hasAttached()) {
                // Detach it
                this._clubesPanelOverlayRef.detach();

                // Reset the club filter
                this.filteredClubes = this.clubes;

                // Toggle the edit mode off
                /* this.clubesEditMode = false; */
            }

            // If template portal exists and attached...
            if (templatePortal && templatePortal.isAttached) {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Toggle the clubes edit mode
     */
    /*     toggleClubesEditMode(): void {
            this.clubesEditMode = !this.clubesEditMode;
        } */

    /**
     * Filter clubes
     *
     * @param event
     */
    filterClubes(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the clubes
        this.filteredClubes = this.clubes.filter(club => club.title.toLowerCase().includes(value));
    }

    /**
     * Filter clubes input key down event
     *
     * @param event
     */
    filterClubesInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no club available...
        /*  if (this.filteredClubes.length === 0) { */
        // Create the club
        /*        this.createClub(event.target.value); */

        // Clear the input
        /*          event.target.value = ''; */

        // Return
        /*          return;
             } */

        // If there is a club...
        const club = this.filteredClubes[0];
        const isClubApplied = this.partner.clubes.find(id => id === club.id);

        // If the found club is already applied to the partner...
        /* if (isClubApplied) { */
        // Remove the club from the partner
        /*             this.removeClubFromPartner(club);
                }
                else { */
        // Otherwise add the club to the partner
        /*             this.addClubToPartner(club);
                } */
    }

    /**
     * Create a new club
     *
     * @param title
     */
    /*     createClub(title: string): void {
            const club = {
                title
            }; */

    // Create club on the server
    /*  this._partnersService.createClub(club)
         .subscribe((response) => { */

    // Add the club to the partner
    /*                 this.addClubToPartner(response);
                });
        } */

    /**
     * Update the club title
     *
     * @param club
     * @param event
     */
    /*     updateClubTitle(club: Club, event): void { */
    // Update the title on the club
    /*         club.title = event.target.value; */

    // Update the club on the server
    /*         this._partnersService.updateClub(club.id, club)
                .pipe(debounceTime(300))
                .subscribe(); */

    // Mark for check
    /*         this._changeDetectorRef.markForCheck();
        }
     */
    /**
     * Delete the club
     *
     * @param club
     */
    /*     deleteClub(club: Club): void { */
    // Delete the club from the server
    /*    this._partnersService.deleteClub(club.id).subscribe(); */

    // Mark for check
    /*         this._changeDetectorRef.markForCheck();
        } */

    /**
     * Add club to the partner
     *
     * @param club
     */
    /* addClubToPartner(club: Club): void { */
    // Add the club
    /* this.partner.clubes.unshift(club.id); */

    // Update the partner form
    /* this.partnerForm.get('clubes').patchValue(this.partner.clubes); */

    // Mark for check
    /*  this._changeDetectorRef.markForCheck();
 } */

    /**
     * Remove club from the partner
     *
     * @param club
     */
    /* removeClubFromPartner(club: Club): void { */
    // Remove the club
    /* this.partner.clubes.splice(this.partner.clubes.findIndex(item => item === club.id), 1); */

    // Update the partner form
    /* this.partnerForm.get('clubes').patchValue(this.partner.clubes); */

    // Mark for check
    /*        this._changeDetectorRef.markForCheck();
       } */

    /**
     * Toggle partner club
     *
     * @param club
     */
    /*     togglePartnerClub(club: Club): void {
            if (this.partner.clubes.includes(club.id)) {
                this.removeClubFromPartner(club);
            }
            else {
                this.addClubToPartner(club);
            }
        } */

    /**
     * Should the create club button be visible
     *
     * @param inputValue
     */
    shouldShowCreateClubButton(inputValue: string): boolean {
        return !!!(inputValue === '' || this.clubes.findIndex(club => club.title.toLowerCase() === inputValue.toLowerCase()) > -1);
    }

    /**
     * Add the email field
     */
    addEmailField(): void {
        // Create an empty email form group
        const emailFormGroup = this._formBuilder.group({
            email: [''],
            label: ['']
        });

        // Add the email form group to the emails form array
        (this.partnerForm.get('emails') as FormArray).push(emailFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeEmailField(index: number): void {
        // Get form array for emails
        const emailsFormArray = this.partnerForm.get('emails') as FormArray;

        // Remove the email field
        emailsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._formBuilder.group({
            country: ['us'],
            phoneNumber: [''],
            label: ['']
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.partnerForm.get('phoneNumbers') as FormArray).push(phoneNumberFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the phone number field
     *
     * @param index
     */
    removePhoneNumberField(index: number): void {
        // Get form array for phone numbers
        const phoneNumbersFormArray = this.partnerForm.get('phoneNumbers') as FormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Get country info by iso code
     *
     * @param iso
     */
    /*     getCountryByIso(iso: string): Country {
            return this.countries.find(country => country.iso === iso);
        } */

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
