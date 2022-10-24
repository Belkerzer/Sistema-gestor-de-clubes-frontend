import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'inicio'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'inicio'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'contrasenia-olvidada', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'restablecer-contrasenia', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'iniciar-sesion', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},            
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'cerrar-sesion', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'desbloquear-sesion', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)},            
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            { path: 'inicio', loadChildren: () => import('app/modules/admin/home/home.module').then(m => m.HomeModule) },
            { path: 'participantes', loadChildren: () => import('app/modules/admin/members/members.module').then(m => m.MembersModule) },
            { path: 'clubes', loadChildren: () => import('app/modules/admin/clubs/clubs.module').then(m => m.ClubsModule) },
            { path: 'actividades', loadChildren: () => import('app/modules/admin/activities/activities.module').then(m => m.ActivitiesModule) },            
            { path: 'reportes', loadChildren: () => import('app/modules/admin/reports/reports.module').then(m => m.ReportsModule) },
            { path: 'administracion', loadChildren: () => import('app/modules/admin/admin/admin.module').then(m => m.AdminModule) },
        ]
    },

    // Wild Card Route for 404 request
    { path: '**', pathMatch: 'full', loadChildren: () => import('app/modules/admin/error/error-404/error-404.module').then(m => m.Error404Module) },

    // Wild Card Route for 500 response
    { path: '**', pathMatch: 'full', loadChildren: () => import('app/modules/admin/error/error-500/error-500.module').then(m => m.Error500Module) },
];
