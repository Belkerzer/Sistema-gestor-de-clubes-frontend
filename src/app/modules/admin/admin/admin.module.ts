import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QuillModule } from 'ngx-quill';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'app/shared/shared.module';
import { AdminComponent } from 'app/modules/admin/admin/admin.component';
import { AdminComposeComponent } from 'app/modules/admin/admin/compose/compose.component';
import { AdminDetailsComponent } from 'app/modules/admin/admin/details/details.component';
import { AdminListComponent } from 'app/modules/admin/admin/list/list.component';
import { AdminSettingsAccountPersonalComponent } from 'app/modules/admin/admin/settings/account/personal/personal.component';
import { AdminSidebarComponent } from 'app/modules/admin/admin/sidebar/sidebar.component';
import { AdminSettingsAccountSecurityComponent } from './settings/account/security/security.component';
import { AdminActionsCreateUserComponent } from "./actions/create-user/create-user.component";
import { adminRoutes } from './admin.routing';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { UsersDetailsComponent } from './settings/general/users/details/details.component';
import { UsersListComponent } from './settings/general/users/list/list.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminComposeComponent,
        AdminDetailsComponent,
        AdminListComponent,
        AdminSettingsAccountPersonalComponent,
        AdminSidebarComponent,
        AdminSettingsAccountSecurityComponent,
        AdminActionsCreateUserComponent,
        UsersListComponent,
        UsersDetailsComponent
    ],
    imports: [
        RouterModule.forChild(adminRoutes),
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        QuillModule.forRoot(),
        FuseFindByKeyPipeModule,
        FuseNavigationModule,
        FuseScrollbarModule,
        FuseScrollResetModule,
        SharedModule
    ],
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: moment.ISO_8601
                },
                display: {
                    dateInput: 'LL',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class AdminModule {
}
