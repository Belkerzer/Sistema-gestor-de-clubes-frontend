import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminComponent } from "../../admin.component";


@Component({
    selector: 'settings-account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSettingsComponent implements OnInit {
    accountForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        public adminComponent: AdminComponent,
        private _formBuilder: FormBuilder
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.accountForm = this._formBuilder.group({
            name: ['Brian Hughes'],
            username: ['brianh'],
            title: ['Senior Frontend Developer'],
            company: ['YXZ Software'],
            about: ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
            email: ['hughes.brian@mail.com', Validators.email],
            phone: ['121-490-33-12'],
            country: ['usa'],
            language: ['english']
        });
    }
}
