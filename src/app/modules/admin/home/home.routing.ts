import { Route } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { AnalyticsResolver } from 'app/modules/admin/home/home.resolvers';

export const homeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            data: AnalyticsResolver
        }
    }
];
