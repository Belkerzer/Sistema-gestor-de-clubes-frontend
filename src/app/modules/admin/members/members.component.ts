import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryCarrera, InventoryPeriodo, InventoryPagination, InventoryMember, InventoryClub, InventorySexo, InventoryFacultad } from 'app/modules/admin/members/members.types';
import {Carreras, Facultades, MembersService, ParticipantesResponse, Periodos, Sexos} from './members.service';
import * as XLSX from 'xlsx';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class MembersComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    participantes$: Observable<ParticipantesResponse[]>;
    data: ParticipantesResponse[];
    fileName = 'Participantes.xlsx';
    formFieldHelpers: string[] = [''];
    carreras: Carreras[];
    periodos: Periodos[];
    facultades: Facultades[];
    filteredClubes: InventoryClub[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    selectedParticipante: ParticipantesResponse | null = null;
    selectedParticipanteForm: FormGroup;
    clubes: InventoryClub[];
    /* clubesEditMode: boolean = false; */
    sexos: Sexos[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _membersService: MembersService
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
    async ngOnInit(): Promise<void> {
        // Create the selected participante form
        this.selectedParticipanteForm = this._formBuilder.group({
            // id: [0],
            idPeriodo: [0],
            nombresCompletos: ['', [Validators.required]],
            observacion: [''],
            club: [''],
            codigo: [''],
            cedula: [''],
            idCarrera: [0],
            idSexo: [0],
            idFacultad: [0],
            correoElectronico: [''],
            nacimiento: ['']
        });

        // Get the carreras
        this._membersService.carreras$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((carreras: Carreras[]) => {

                // Update the carreras
                this.carreras = carreras;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the periodos
        this._membersService.periodos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((periodos: Periodos[]) => {

                // Update the periodos
                this.periodos = periodos;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the participantes
        this.participantes$ = this._membersService.getParticipantes();
        this.participantes$.subscribe({next: res => this.data = res});

        // Get the clubes
        this._membersService.clubes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((clubes: InventoryClub[]) => {

                // Update the clubes
                this.clubes = clubes;
                this.filteredClubes = clubes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the sexos
        this._membersService.sexos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((sexos: Sexos[]) => {
                // Update the vendors
                this.sexos = sexos;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the facultades
        this._membersService.facultades$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((facultades: Facultades[]) => {

                // Update the facultades
                this.facultades = facultades;

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
                    this.participantes$ = this._membersService.getParticipantes(query);
                    return this._membersService.getParticipantes(query);
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

            // Get participantes if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._membersService.getParticipantes('');
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
     * Toggle participante details
     *
     * @param participanteId
     */
    toggleDetails(participanteId: number): void {

        // If the participante is already selected...
        if (this.selectedParticipante && this.selectedParticipante.id === participanteId) {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the participante by id
        this._membersService.getParticipanteById(participanteId)
            .subscribe((participante) => {
                console.log(participante);
                // Set the selected participante
                this.selectedParticipante = participante;

                // Fill the form
                // this.selectedParticipanteForm.patchValue(participante);
                this.fillForm(participante);


                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedParticipante = null;
    }

    /**
     * Cycle through images of selected participante
     */
    cycleImages(forward: boolean = true): void {
        // Get the image count and current image index
        const count = this.selectedParticipanteForm.get('images').value.length;
        const currentIndex = this.selectedParticipanteForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if (forward) {
            this.selectedParticipanteForm.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else {
            this.selectedParticipanteForm.get('currentImageIndex').setValue(prevIndex);
        }
    }

    /**
     * Toggle the clubes edit mode
     */
    /* toggleClubesEditMode(): void {
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
        /*   this.createClub(event.target.value); */

            // Clear the input
        /*    event.target.value = ''; */

            // Return
        /*        return;
           } */

        // If there is a club...
        //const club = this.filteredClubes[0];
        // const isClubApplied = this.selectedParticipante.club.find(id => id === club.id);

        // If the found club is already applied to the participante...
        // if (isClubApplied) {
        //     // Remove the club from the participante
        //     this.removeClubFromParticipante(club);
        // }
        // else {
        //     // Otherwise add the club to the participante
        //     this.addClubToParticipante(club);
        // }
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
    /*    this._membersService.createClub(club)
           .subscribe((response) => { */

                // Add the club to the participante
/*                 this.addClubToParticipante(response);
            });
    } */

    /**
     * Update the club title
     *
     * @param club
     * @param event
     */
    /*  updateClubTitle(club: InventoryClub, event): void { */
        // Update the title on the club
    /*  club.title = event.target.value; */

        // Update the club on the server
       /*  this._membersService.updateClub(club.id, club)
            .pipe(debounceTime(300))
            .subscribe();
 */
        // Mark for check
    /*        this._changeDetectorRef.markForCheck();
       } */

    /**
     * Delete the club
     *
     * @param club
     */
    /*  deleteClub(club: InventoryClub): void { */
        // Delete the club from the server
    /*     this._membersService.deleteClub(club.id).subscribe(); */

        // Mark for check
    /*      this._changeDetectorRef.markForCheck();
     } */

    /**
     * Add club to the participante
     *
     * @param club
     */
    addClubToParticipante(club: InventoryClub): void {
        // Add the club
        // this.selectedParticipante.club.unshift(club.id);

        // Update the selected participante form
        // this.selectedParticipanteForm.get('clubes').patchValue(this.selectedParticipante.club);

        // Mark for check
        // this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove club from the participante
     *
     * @param club
     */
    removeClubFromParticipante(club: InventoryClub): void {
        // Remove the club
        // this.selectedParticipante.club.splice(this.selectedParticipante.club.findIndex(item => item === club.id), 1);
        //
        // // Update the selected participante form
        // this.selectedParticipanteForm.get('clubes').patchValue(this.selectedParticipante.clubes);
        //
        // // Mark for check
        // this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle participante club
     *
     * @param club
     * @param change
     */
    toggleParticipanteClub(club: InventoryClub, change: MatCheckboxChange): void {
        if (change.checked) {
            this.addClubToParticipante(club);
        }
        else {
            this.removeClubFromParticipante(club);
        }
    }

    /**
     * Should the create club button be visible
     *
     * @param inputValue
     */
    /*     shouldShowCreateClubButton(inputValue: string): boolean {
            return !!!(inputValue === '' || this.clubes.findIndex(club => club.title.toLowerCase() === inputValue.toLowerCase()) > -1);
        } */

    /**
     * Create participante
     */
    createParticipante(): void {
        // Create the participante
        this._membersService.createParticipante().subscribe((newParticipante) => {

            // Go to new participante
            this.selectedParticipante = newParticipante[0];

            this.data.unshift(newParticipante[0]);
            // Fill the form
            this.selectedParticipanteForm.patchValue(newParticipante[0]);

            // Mark for check
            this._changeDetectorRef.markForCheck();

        });
    }

    /**
     * Update the selected participante using the form data
     */
    updateSelectedParticipante(id: number): void {
        // Get the participante object
        //const participante = this.selectedParticipanteForm.getRawValue();
        if(this.selectedParticipanteForm.invalid){
            return;
        }

        const participante = this.selectedParticipanteForm.value;
        // Remove the currentImageIndex field
        delete participante.currentImageIndex;

        // Update the participante on the server
        this._membersService.updateParticipante(id, participante).subscribe(() => {

            // Show a success message
            this.showFlashMessage('success');
        });
    }

    /**
     * Delete the selected participante using the form data
     */
    deleteSelectedParticipante(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar integrante',
            message: '¿Está seguro de que quiere eliminar este integrante? Esta acción no se puede deshacer.',
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

                // Get the participante object
                const participante = this.selectedParticipanteForm.getRawValue();

                // Delete the participante on the server
                // this._membersService.deleteParticipante(participante.id).subscribe(() => {
                //
                //     // Close the details
                //     this.closeDetails();
                // });
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

    exportExcel(): void {
        /* table id is passed over here */
        const element = document.getElementById('participantes-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Participantes');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);

    }


    fillForm(participante: any): void{
        this.selectedParticipanteForm.patchValue(participante);
        this.selectedParticipanteForm.get('idCarrera').setValue(participante.carreras.id);
        this.selectedParticipanteForm.get('idFacultad').setValue(participante.facultades.id);
        this.selectedParticipanteForm.get('idPeriodo').setValue(participante.periodos.id);
        this.selectedParticipanteForm.get('idSexo').setValue(participante.sexos.id);
    }
}
