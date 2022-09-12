import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { BooleanInput } from '@angular/cdk/coercion';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'inicio',
    templateUrl  : './inicio.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class InicioComponent
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;    

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     ngOnInit(): void
     {
         // Subscribe to user changes
         this._userService.user$
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe((user: User) => {
                 this.user = user;
 
                 // Mark for check
                 this._changeDetectorRef.markForCheck();
             });
     }
 
     /**
      * On destroy
      */
     ngOnDestroy(): void
     {
         // Unsubscribe from all subscriptions
         this._unsubscribeAll.next(null);
         this._unsubscribeAll.complete();
     }
}
