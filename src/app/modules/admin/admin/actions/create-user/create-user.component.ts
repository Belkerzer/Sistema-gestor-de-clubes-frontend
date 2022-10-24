import { BooleanInput } from "@angular/cdk/coercion";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, UntypedFormGroup } from "@angular/forms";
import { FuseValidators } from "@fuse/validators";
import { UserService } from "app/core/user/user.service";
import { User } from "app/core/user/user.types";
import { Subject, takeUntil } from "rxjs";
import { AdminComponent } from "../../admin.component";

@Component({
    selector: 'actions-create-user',
    templateUrl: './create-user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class AdminActionsCreateUserComponent implements OnInit {
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;
    accountForm: FormGroup;
    resetPasswordForm: UntypedFormGroup;
    roles: any[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public adminComponent: AdminComponent,
        private _formBuilder: FormBuilder,
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
        // Create the form
        this.resetPasswordForm = this._formBuilder.group({
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        },
            {
                validators: FuseValidators.mustMatch('password', 'passwordConfirm')
            }
        );
        // Create the form
        this.accountForm = this._formBuilder.group({
            name: [''],
            username: [''],
            title: [''],
            company: [''],
            about: [''],
            email: ['', Validators.email],
            phone: [''],
            country: [''],
            language: ['']
        });
        // Setup the roles
        this.roles = [
            {
                label: 'Líder Estudiantil',
                value: 'lider estudiantil',
                description: 'Visualiza a los participantes y actividades del club.'
            },
            {
                label: 'Docente-Tutor',
                value: 'docente-tutor',
                description: 'Visualiza, crea, modifica y elimina a los participantes del club. Desarrolla las actividades de acuerdo con el plan de trabajo del club.'
            },
            {
                label: 'Dirigente',
                value: 'dirigente',
                description: 'Visualiza a todos los participantes y actividades; por otro lado, visualiza, crea, modifica y elimina a los clubes, asímismo a los usuarios. Elabora informes periódicos de los resultados obtenidos de los clubes.'
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
 * Upload avatar
 *
 * @param fileList
 */
    /*     uploadAvatar(fileList: FileList): void {
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
            this._contactsService.uploadAvatar(this.contact.id, file).subscribe();
        } */

    /**
     * Remove the avatar
     */
    /*     removeAvatar(): void {
            // Get the form control for 'avatar'
            const avatarFormControl = this.contactForm.get('avatar');
    
            // Set the avatar as null
            avatarFormControl.setValue(null);
    
            // Set the file input value as null
            this._avatarFileInput.nativeElement.value = null;
    
            // Update the contact
            this.contact.avatar = null;
        } */
}
