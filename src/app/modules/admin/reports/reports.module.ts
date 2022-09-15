import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { ReportsComponent } from 'app/modules/admin/reports/reports.component';
import { SharedModule } from 'app/shared/shared.module';

const reportsRoutes: Route[] = [
  {
      path     : '',
      component: ReportsComponent
  }
];

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    RouterModule.forChild(reportsRoutes),
    MatButtonModule,
    MatIconModule,    
    SharedModule
  ]
})
export class ReportsModule { }
