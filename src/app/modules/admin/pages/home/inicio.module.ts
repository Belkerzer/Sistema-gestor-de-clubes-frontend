import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { InicioComponent } from 'app/modules/admin/pages/home/inicio.component';
import { SharedModule } from 'app/shared/shared.module';

const inicioRoutes: Route[] = [
    {
        path     : '',
        component: InicioComponent
    }
];

@NgModule({
    declarations: [
        InicioComponent
    ],
    imports     : [
        RouterModule.forChild(inicioRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class InicioModule
{
}
