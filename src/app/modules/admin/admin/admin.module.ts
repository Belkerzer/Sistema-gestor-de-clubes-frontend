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
import { AdminSettingsComponent } from 'app/modules/admin/admin/settings/account/account.component';
import { AdminSidebarComponent } from 'app/modules/admin/admin/sidebar/sidebar.component';
import { AdminSecurityComponent } from './settings/security/security.component';
import { adminRoutes } from './admin.routing';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        AdminComponent,
        AdminComposeComponent,
        AdminDetailsComponent,
        AdminListComponent,
        AdminSettingsComponent,
        AdminSidebarComponent,
        AdminSecurityComponent
    ],
    imports: [
        RouterModule.forChild(adminRoutes),
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        QuillModule.forRoot(),
        FuseFindByKeyPipeModule,
        FuseNavigationModule,
        FuseScrollbarModule,
        FuseScrollResetModule,
        SharedModule
    ]
})
export class AdminModule {
}
