import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { PartnersService } from '../partners.service';
import { Partner } from '../partners.types';
import { BooleanInput } from '@angular/cdk/coercion';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { AdminComponent } from 'app/modules/admin/admin/admin.component';


@Component({
    selector: 'users-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class PartnersListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */
    @Input() showAvatar: boolean = true;

    partners$: Observable<Partner[]>;
    user: User;
    partnersCount: number = 0;
    partnersTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    /* countries: Country[]; */
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl = new FormControl();
    selectedPartner: Partner;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _partnersService: PartnersService,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _userService: UserService,
        public adminComponent: AdminComponent,
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
        // Get the partners
        this.partners$ = this._partnersService.partners$;
        this._partnersService.partners$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((partners: Partner[]) => {

                // Update the counts
                this.partnersCount = partners.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the partner
        this._partnersService.partner$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((partner: Partner) => {

                // Update the selected partner
                this.selectedPartner = partner;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the countries
        /*         this._partnersService.countries$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((countries: Country[]) => { */

        // Update the countries
        /*          this.countries = countries; */

        // Mark for check
        /*                 this._changeDetectorRef.markForCheck();
                    }); */

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(query =>

                    // Search
                    this._partnersService.searchPartners(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected partner when drawer closed
                this.selectedPartner = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                }
                else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        /*         fromEvent(this._document, 'keydown')
                    .pipe(
                        takeUntil(this._unsubscribeAll),
                        filter<KeyboardEvent>(event => */
        /*            (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                   && (event.key === '/')  */// '/'
        /*              )
                 )
                 .subscribe(() => {
                     this.createPartner();
                 }); */
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
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create partner
     */
    /* createPartner(): void { */
    // Create the partner
    /* this._partnersService.createPartner().subscribe((newPartner) => { */

    // Go to the new partner
    /* this._router.navigate(['./', newPartner.id], { relativeTo: this._activatedRoute }); */

    // Mark for check
    /*             this._changeDetectorRef.markForCheck();
            });
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
