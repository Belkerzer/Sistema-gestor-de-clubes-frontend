import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryActivities, InventoryFacultadActividades, InventoryClubActividades, InventoryPagination, InventoryParticipanteActividades, InventoryProgramaActividades } from './activities.types';
import { ActivitiesService } from './activities.service';

@Component({
    selector: 'activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class ActivitiesComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    activities$: Observable<InventoryActivities[]>;

    formFieldHelpers: string[] = [''];
    facultadesActividades: InventoryFacultadActividades[];
    clubesActividades: InventoryClubActividades[];
    filteredParticipantesActividades: InventoryParticipanteActividades[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    paginationActividades: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selectedActivity: InventoryActivities | null = null;
    selectedActivityForm: FormGroup;
    participantesActividades: InventoryParticipanteActividades[];
    /* participantesActividadesEditMode: boolean = false; */
    periodosActividades: InventoryProgramaActividades[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _activitiesService: ActivitiesService
    ) {
    }
    ngAfterViewChecked(): void {
        this._changeDetectorRef.detectChanges();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the selected activity form
        this.selectedActivityForm = this._formBuilder.group({
            id: [''],
            clubActividades: [''],
            name: ['', [Validators.required]],
            observacion: [''],
            participantesActividades: [[]],
            /* sku: [''],
            barcode: [''], */
            factultadActividades: [''],
            programaActividades: [''],
            fechaPlanificacion: [''],
            horas: [''],
            materiales: [''],
            fechaSeguimiento: [''],
            /* taxPercent: [''], */
            lugar: [''],
            fechaEstimada: [''],
            /* thumbnail: [''],
            images: [[]],
            currentImageIndex: [0], */ // Image index that is currently being viewed
            logro: ['']
        });

        // Get the facultadesActividades
        this._activitiesService.facultadesActividades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((facultadesActividades: InventoryFacultadActividades[]) => {

                // Update the facultadesActividades
                this.facultadesActividades = facultadesActividades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the clubesActividades
        this._activitiesService.clubesActividades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((clubesActividades: InventoryClubActividades[]) => {

                // Update the clubesActividades
                this.clubesActividades = clubesActividades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the paginationActividades
        this._activitiesService.paginationActividades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((paginationActividades: InventoryPagination) => {

                // Update the paginationActividades
                this.paginationActividades = paginationActividades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the activities
        this.activities$ = this._activitiesService.activities$;

        // Get the participantesActividades
        this._activitiesService.participantesActividades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((participantesActividades: InventoryParticipanteActividades[]) => {

                // Update the participantesActividades
                this.participantesActividades = participantesActividades;
                this.filteredParticipantesActividades = participantesActividades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the periodosActividades
        this._activitiesService.periodosActividades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((periodosActividades: InventoryProgramaActividades[]) => {

                // Update the periodosActividades
                this.periodosActividades = periodosActividades;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._activitiesService.getActivities(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get activities if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._activitiesService.getActivities(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    /**
     * Toggle activity details
     *
     * @param activityId
     */
    toggleDetails(activityId: string): void {
        // If the activity is already selected...
        if (this.selectedActivity && this.selectedActivity.id === activityId) {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the activity by id
        this._activitiesService.getActivityById(activityId)
            .subscribe((activity) => {

                // Set the selected activity
                this.selectedActivity = activity;

                // Fill the form
                this.selectedActivityForm.patchValue(activity);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedActivity = null;
    }

    /**
     * Cycle through images of selected activity
     */
    cycleImages(forward: boolean = true): void {
        // Get the image count and current image index
        const count = this.selectedActivityForm.get('images').value.length;
        const currentIndex = this.selectedActivityForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if (forward) {
            this.selectedActivityForm.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else {
            this.selectedActivityForm.get('currentImageIndex').setValue(prevIndex);
        }
    }

    /**
     * Toggle the participantesActividades edit mode
     */
    /*     toggleParticipantesActividadesEditMode(): void {
            this.participantesActividadesEditMode = !this.participantesActividadesEditMode;
        } */

    /**
     * Filter participantesActividades
     *
     * @param event
     */
    filterParticipantesActividades(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the participantesActividades
        this.filteredParticipantesActividades = this.participantesActividades.filter(participanteActividades => participanteActividades.title.toLowerCase().includes(value));
    }

    /**
     * Filter participantesActividades input key down event
     *
     * @param event
     */
    filterParticipantesActividadesInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no participanteActividades available...
        /*        if (this.filteredParticipantesActividades.length === 0) { */
            // Create the participanteActividades
        /*    this.createParticipanteActividades(event.target.value); */

            // Clear the input
        /*   event.target.value = ''; */

            // Return
        /*         return;
            } */

        // If there is a participanteActividades...
        const participanteActividades = this.filteredParticipantesActividades[0];
        const isParticipanteActividadesApplied = this.selectedActivity.participantesActividades.find(id => id === participanteActividades.id);

        // If the found participanteActividades is already applied to the activity...
        if (isParticipanteActividadesApplied) {
            // Remove the participanteActividades from the activity
            this.removeParticipanteActividadesFromActivity(participanteActividades);
        }
        else {
            // Otherwise add the participanteActividades to the activity
            this.addParticipanteActividadesToActivity(participanteActividades);
        }
    }

    /**
     * Create a new participanteActividades
     *
     * @param title
     */
 /*    createParticipanteActividades(title: string): void {
        const participanteActividades = {
            title
        }; */

        // Create participanteActividades on the server
    /*       this._activitiesService.createParticipanteActividades(participanteActividades)
              .subscribe((response) => { */

                // Add the participanteActividades to the activity
 /*                this.addParticipanteActividadesToActivity(response);
            });
    } */

    /**
     * Update the participanteActividades title
     *
     * @param participanteActividades
     * @param event
     */
    /*    updateParticipanteActividadesTitle(participanteActividades: InventoryParticipanteActividades, event): void { */
        // Update the title on the participanteActividades
    /*         participanteActividades.title = event.target.value; */

        // Update the participanteActividades on the server
  /*       this._activitiesService.updateParticipanteActividades(participanteActividades.id, participanteActividades)
            .pipe(debounceTime(300))
            .subscribe(); */

        // Mark for check
    /*       this._changeDetectorRef.markForCheck();
      } */

    /**
     * Delete the participanteActividades
     *
     * @param participanteActividades
     */
    /*     deleteParticipanteActividades(participanteActividades: InventoryParticipanteActividades): void { */
        // Delete the participanteActividades from the server
    /*         this._activitiesService.deleteParticipanteActividades(participanteActividades.id).subscribe(); */

        // Mark for check
    /*        this._changeDetectorRef.markForCheck();
       } */

    /**
     * Add participanteActividades to the activity
     *
     * @param participanteActividades
     */
    addParticipanteActividadesToActivity(participanteActividades: InventoryParticipanteActividades): void {
        // Add the participanteActividades
        this.selectedActivity.participantesActividades.unshift(participanteActividades.id);

        // Update the selected activity form
        this.selectedActivityForm.get('participantesActividades').patchValue(this.selectedActivity.participantesActividades);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove participanteActividades from the activity
     *
     * @param participanteActividades
     */
    removeParticipanteActividadesFromActivity(participanteActividades: InventoryParticipanteActividades): void {
        // Remove the participanteActividades
        this.selectedActivity.participantesActividades.splice(this.selectedActivity.participantesActividades.findIndex(item => item === participanteActividades.id), 1);

        // Update the selected activity form
        this.selectedActivityForm.get('participantesActividades').patchValue(this.selectedActivity.participantesActividades);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle activity participanteActividades
     *
     * @param participanteActividades
     * @param change
     */
    toggleActivityParticipanteActividades(participanteActividades: InventoryParticipanteActividades, change: MatCheckboxChange): void {
        if (change.checked) {
            this.addParticipanteActividadesToActivity(participanteActividades);
        }
        else {
            this.removeParticipanteActividadesFromActivity(participanteActividades);
        }
    }

    /**
     * Should the create participanteActividades button be visible
     *
     * @param inputValue
     */
    /*     shouldShowCreateParticipanteActividadesButton(inputValue: string): boolean {
            return !!!(inputValue === '' || this.participantesActividades.findIndex(participanteActividades => participanteActividades.title.toLowerCase() === inputValue.toLowerCase()) > -1);
        } */

    /**
     * Create activity
     */
    createActivity(): void {
        // Create the activity
        this._activitiesService.createActivity().subscribe((newActivity) => {

            // Go to new activity
            this.selectedActivity = newActivity;

            // Fill the form
            this.selectedActivityForm.patchValue(newActivity);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected activity using the form data
     */
    updateSelectedActivity(): void {
        // Get the activity object
        const activity = this.selectedActivityForm.getRawValue();

        // Remove the currentImageIndex field
        delete activity.currentImageIndex;

        // Update the activity on the server
        this._activitiesService.updateActivity(activity.id, activity).subscribe(() => {

            // Show a success message
            this.showFlashMessage('success');
        });
    }

    /**
     * Delete the selected activity using the form data
     */
    deleteSelectedActivity(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar actividad',
            message: '¿Está seguro de que quiere eliminar esta actividad? Esta acción no se puede deshacer.',
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

                // Get the activity object
                const activity = this.selectedActivityForm.getRawValue();

                // Delete the activity on the server
                this._activitiesService.deleteActivity(activity.id).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

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
