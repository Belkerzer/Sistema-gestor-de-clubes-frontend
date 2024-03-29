import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import * as XLSX from 'xlsx';
import {ClubsService, datosClub, Docentes, Facultades, IClubes, Lideres, Participante, Programas} from './clubs.service';
import moment from 'moment';

@Component({
    selector: 'clubs',
    templateUrl: './clubs.component.html',
    styleUrls: ['./clubs.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class ClubsComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    moment = moment;
    clubs$: Observable<IClubes[]>;
    data: IClubes[];
    fileName = 'Clubes.xlsx';
    formFieldHelpers: string[] = [''];
    facultadesClub: Facultades[];
    lideresEstudiantiles: Lideres[];
    filteredDocentesTutores: Docentes[];
    filteredParticipantesClubes: Participante[];
    programas: Programas[];
    docentesTutores: Docentes[];
    participantesClubes: Participante[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    // paginationClubs: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selectedClub: IClubes | null = null;
    selectedClubForm: FormGroup;
    /* docentesTutoresEditMode: boolean = false; */
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _clubsService: ClubsService
    ) {
    }
    ngAfterViewChecked(): void {
        this._changeDetectorRef.detectChanges();
    }
    setFechaIncio(fecha : string) {
        const FECHA = fecha.split(' ')[0].split('/');
        this.selectedClubForm.controls.fechaInicio.setValue(new Date( Number(FECHA[2]), Number(FECHA[1]), Number(FECHA[0]) ) )
    }
    setFechaCierre(fecha : string) {
        const FECHA = fecha.split(' ')[0].split('/');
        this.selectedClubForm.controls.fechaCierre.setValue( new Date(Number(FECHA[2]), Number(FECHA[1]), Number(FECHA[0])))
    }

    createClubes(): void {

        const BODY: datosClub = {
            descripcion: this.selectedClubForm.controls.descripcion.value,
            fechaCierre: this.selectedClubForm.controls.fechaCierre.value,
            fechaInicio: this.selectedClubForm.controls.fechaInicio.value,
            id_facultad: this.selectedClubForm.controls.idFacultad.value,
            id_docente_tutor: this.selectedClubForm.controls.idDocenteTutor.value,
            id_lider_estudiantil: this.selectedClubForm.controls.idLider.value,
            id_tipo: this.selectedClubForm.controls.idTipo.value,
            nombreClub: this.selectedClubForm.controls.club.value,
            id_departamento: 1,
            id_direccion: 1,
            id_programa: 1
        }

        this._clubsService.crearClubes(BODY).subscribe( respuesta=> {
            console.log(respuesta)
        });
    }

    updateClubes(): void {
        let fechaIngreso: string = moment(this.selectedClubForm.controls.fechaInicio.value).format('yyyy-MM-DD').split(' ')[0];
        let fechaCierre: string = moment(this.selectedClubForm.controls.fechaCierre.value).format('yyyy-MM-DD').split(' ')[0];
        const BODY: datosClub = {
            descripcion: this.selectedClubForm.controls.descripcion.value,
            fechaCierre: fechaCierre,
            fechaInicio: fechaIngreso,
            id_facultad: this.selectedClubForm.controls.idFacultad.value,
            id_docente_tutor: this.selectedClubForm.controls.idDocenteTutor.value,
            id_lider_estudiantil: this.selectedClubForm.controls.idLider.value,
            id_tipo: this.selectedClubForm.controls.idTipo.value ? 0 : 1,
            nombreClub: this.selectedClubForm.controls.club.value,
            id_departamento: 1,
            id_direccion: 1,
            id_programa: 1,
            id_club: this.selectedClubForm.controls.id.value
        }

        this._clubsService.actualizarClubes(BODY).subscribe( respuesta=> {
            this.showFlashMessage('success');
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the selected club form
        this.selectedClubForm = this._formBuilder.group({
            id: [0],
            idLider: [0],
            club: ['', [Validators.required]],
            descripcion: [''],
            idDocenteTutor: [0],
            participantesClubes: [[]],
            idTipo: [0],
/*             barcode: [''], */
            idFacultad: [0],
            /* programa: [''], */
            fechaCreacion: [''],
            fechaInicio: [''],
            fechaCierre: [''],
/*             reserved: [''],
            cost: [''],
            basePrice: [''],
            taxPercent: [''],
            price: [''],
            weight: [''],
            thumbnail: [''],
            images: [[]],
            currentImageIndex: [0],  */// Image index that is currently being viewed
            participantes: ['']
        });

        // Get the facultadesClub
        this._clubsService.facultadesClub$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((facultadesClub: Facultades[]) => {
                // Update the facultadesClub
                this.facultadesClub = facultadesClub;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the lideresEstudiantiles
        this._clubsService.lideresEstudiantiles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((lideresEstudiantiles: Lideres[]) => {

                // Update the lideresEstudiantiles
                this.lideresEstudiantiles = lideresEstudiantiles;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the paginationClubs
        // this._clubsService.paginationClubs$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((paginationClubs: InventoryPagination) => {
        //
        //         // Update the paginationClubs
        //         this.paginationClubs = paginationClubs;
        //
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the clubs
        this.clubs$ = this._clubsService.clubs$;
        this.clubs$.subscribe({ next: res => this.data = res });

        // Get the participantesClubes
        this._clubsService.participantesClubes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((participantesClubes: Participante[]) => {

                // Update the participantesClubes
                this.participantesClubes = participantesClubes;
                this.filteredParticipantesClubes = participantesClubes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        // Get the docentesTutores
        this._clubsService.docentesTutores$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((docentesTutores: Docentes[]) => {

                // Update the docentesTutores
                this.docentesTutores = docentesTutores;
                this.filteredDocentesTutores = docentesTutores;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the programas
        this._clubsService.programas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((programas: Programas[]) => {

                // Update the programas
                this.programas = programas;

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
                    return this._clubsService.getClubs(query);
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

            // Get clubs if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._clubsService.getClubs();
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
            this.clubs$ = this._clubsService.getClubs();
            this.clubs$.subscribe({next: res => this.data = res});
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
     * Toggle club details
     *
     * @param clubId
     */
    toggleDetails(clubId: number): void {
        // If the club is already selected...
        if (this.selectedClub && this.selectedClub.id === clubId) {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the club by id
        this._clubsService.getClubById(clubId)
            .subscribe((club) => {

                // Set the selected club
                this.selectedClub = club;

                // Fill the form
                this.selectedClubForm.patchValue(club);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedClub = null;
    }

    /**
     * Cycle through images of selected club
     */
    cycleImages(forward: boolean = true): void {
        // Get the image count and current image index
        const count = this.selectedClubForm.get('images').value.length;
        const currentIndex = this.selectedClubForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if (forward) {
            this.selectedClubForm.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else {
            this.selectedClubForm.get('currentImageIndex').setValue(prevIndex);
        }
    }

    /**
     * Toggle the docentesTutores edit mode
     */
    /*   toggleDocentesTutoresEditMode(): void {
          this.docentesTutoresEditMode = !this.docentesTutoresEditMode;
      } */

    /**
     * Filter participantesClubes
     *
     * @param event
     */
    filterParticipantesClubes(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the participantesClubes
        this.filteredParticipantesClubes = this.participantesClubes.filter(participanteClubes => participanteClubes.nombresCompletos.toLowerCase().includes(value));
    }

    /**
     * Filter participantesClubes input key down event
     *
     * @param event
     */
    filterParticipantesClubesInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no participanteClubes available...
        /*        if (this.filteredParticipantesClubes.length === 0) { */
        // Create the participanteClubes
        /*    this.createParticipanteClubes(event.target.value); */

        // Clear the input
        /*   event.target.value = ''; */

        // Return
        /*         return;
            } */

        // If there is a participanteClubes...
        /* const participanteClubes = this.filteredParticipantesClubes[0]; */
        /* const isParticipanteClubesApplied = this.selectedClub.participantesClubes.find(id => id === participanteClubes.id); */

        // If the found participanteClubes is already applied to the club...
/*         if (isParticipanteClubesApplied) {
            // Remove the participanteClubes from the club
            this.removeParticipanteClubesFromClub(participanteClubes);
        }
        else {
            // Otherwise add the participanteClubes to the club
            this.addParticipanteClubesToClub(participanteClubes);
        } */
    }

    /**
     * Add participanteClubes to the club
     *
     * @param participanteClubes
     */
/*     addParticipanteClubesToClub(participanteClubes: InventoryParticipanteClubes): void {
        // Add the participanteClubes
        this.selectedClub.participantesClubes.unshift(participanteClubes.id);

        // Update the selected activity form
        this.selectedClubForm.get('participantesClubes').patchValue(this.selectedClub.participantesClubes);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    } */

    /**
     * Remove participanteClubes from the club
     *
     * @param participanteClubes
     */
/*     removeParticipanteClubesFromClub(participanteClubes: InventoryParticipanteClubes): void {
        // Remove the participanteClubes
        this.selectedClub.participantesClubes.splice(this.selectedClub.participantesClubes.findIndex(item => item === participanteClubes.id), 1);

        // Update the selected club form
        this.selectedClubForm.get('participantesClubes').patchValue(this.selectedClub.participantesClubes);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    } */

    /**
     * Toggle activity participanteClubes
     *
     * @param participanteClubes
     * @param change
     */
/*     toggleActivityParticipanteClubes(participanteClubes: InventoryParticipanteClubes, change: MatCheckboxChange): void {
        if (change.checked) {
            this.addParticipanteClubesToClub(participanteClubes);
        }
        else {
            this.removeParticipanteClubesFromClub(participanteClubes);
        }
    } */

    /**
     * Filter docentesTutores
     *
     * @param event
     */
    filterDocentesTutores(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the docentesTutores
        this.filteredDocentesTutores = this.docentesTutores.filter(docenteTutor => docenteTutor.docente.toLowerCase().includes(value));
    }

    /**
     * Filter docentesTutores input key down event
     *
     * @param event
     */
    filterDocentesTutoresInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if (event.key !== 'Enter') {
            return;
        }

        // If there is no docenteTutor available...
        /*     if (this.filteredDocentesTutores.length === 0) { */
            // Create the docenteTutor
        /*        this.createDocenteTutor(event.target.value);

            // Clear the input
        /*        event.target.value = ''; */

            // Return
        /*          return;
             } */

        // If there is a docenteTutor...
        const docenteTutor = this.filteredDocentesTutores[0];
        // const isDocenteTutorApplied = this.selectedClub.docentes.find(id => id === docenteTutor.id);
        //
        // // If the found docenteTutor is already applied to the club...
        // if (isDocenteTutorApplied) {
        //     // Remove the docenteTutor from the club
        //     this.removeDocenteTutorFromClub(docenteTutor);
        // }
        // else {
        //     // Otherwise add the docenteTutor to the club
        //     this.addDocenteTutorToClub(docenteTutor);
        // }
    }

    /**
     * Create a new docenteTutor
     *
     * @param title
     */
/*     createDocenteTutor(title: string): void {
        const docenteTutor = {
            title
        }; */

        // Create docenteTutor on the server
    /*        this._clubsService.createDocenteTutor(docenteTutor)
               .subscribe((response) => { */

                // Add the docenteTutor to the club
/*                 this.addDocenteTutorToClub(response);
            });
    } */

    /**
     * Update the docenteTutor title
     *
     * @param docenteTutor
     * @param event
     */
    /*     updateDocenteTutorTitle(docenteTutor: InventoryDocenteTutor, event): void { */
        // Update the title on the docenteTutor
    /*      docenteTutor.title = event.target.value; */

        // Update the docenteTutor on the server
/*         this._clubsService.updateDocenteTutor(docenteTutor.id, docenteTutor)
            .pipe(debounceTime(300))
            .subscribe(); */

        // Mark for check
    /*         this._changeDetectorRef.markForCheck();
        } */

    /**
     * Delete the docenteTutor
     *
     * @param docenteTutor
     */
    /*   deleteDocenteTutor(docenteTutor: InventoryDocenteTutor): void { */
        // Delete the docenteTutor from the server
    /*   this._clubsService.deleteDocenteTutor(docenteTutor.id).subscribe(); */

        // Mark for check
    /*         this._changeDetectorRef.markForCheck();
        } */

    /**
     * Add docenteTutor to the club
     *
     * @param docenteTutor
     */
    addDocenteTutorToClub(docenteTutor: Docentes): void {
        // Add the docenteTutor
        //this.selectedClub.docentes.unshift(docenteTutor.id);

        // Update the selected club form
        this.selectedClubForm.get('docentesTutores').patchValue(this.selectedClub.docentes);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove docenteTutor from the club
     *
     * @param docenteTutor
     */
    removeDocenteTutorFromClub(docenteTutor: Docentes): void {
        // Remove the docenteTutor
        //this.selectedClub.docentes.splice(this.selectedClub.docentes.findIndex(item => item === docenteTutor.id), 1);

        // Update the selected club form
        this.selectedClubForm.get('docentesTutores').patchValue(this.selectedClub.docentes);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle club docenteTutor
     *
     * @param docenteTutor
     * @param change
     */
    toggleClubDocenteTutor(docenteTutor: Docentes, change: MatCheckboxChange): void {
        if (change.checked) {
            this.addDocenteTutorToClub(docenteTutor);
        }
        else {
            this.removeDocenteTutorFromClub(docenteTutor);
        }
    }

    /**
     * Should the create docenteTutor button be visible
     *
     * @param inputValue
     */
    /*     shouldShowCreateDocenteTutorButton(inputValue: string): boolean {
            return !!!(inputValue === '' || this.docentesTutores.findIndex(docenteTutor => docenteTutor.title.toLowerCase() === inputValue.toLowerCase()) > -1);
        } */

    /**
     * Create club
     */
    createClub(): void {
        // Create the club
        this._clubsService.createClub().subscribe((newClub) => {

            // Go to new club
            this.selectedClub = newClub;

            this.data.unshift(newClub[0]);
            // Fill the form
            this.selectedClubForm.patchValue(newClub);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected club using the form data
     */
    updateClub(id: number): void {
        // Get the club object
        if (this.selectedClubForm.invalid) {
            return;
        }
        const club = this.selectedClubForm.value;
        /* const club = this.selectedClubForm.getRawValue(); */

        // Remove the currentImageIndex field
        delete club.currentImageIndex;

        // Update the club on the server
        this._clubsService.updateClub(id, club).subscribe(() => {

            // Show a success message
            this.showFlashMessage('success');
        });
    }

    /**
     * Delete the selected club using the form data
     */
    deleteSelectedClub(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar club',
            message: '¿Está seguro de que quiere eliminar este club? Esta acción no se puede deshacer.',
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

                // Get the club object
                const club = this.selectedClubForm.getRawValue();

                // Delete the club on the server
                this._clubsService.deleteClub(club.id).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                    const index = this.data.findIndex(object => object.id === club.id);
                    this.data.splice(index, 1);
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

    exportExcel(): void {
        /* table id is passed over here */
        const element = (this.data);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Clubes');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);

    }
}
