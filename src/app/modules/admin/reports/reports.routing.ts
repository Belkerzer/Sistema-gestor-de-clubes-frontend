import { Route } from '@angular/router';
import { CanDeactivateTasksDetails } from 'app/modules/admin/reports/reports.guards';
import { ReportsTaskResolver, TasksResolver, ReportsTagsResolver } from 'app/modules/admin/reports/reports.resolvers';
import { ReportsDetailsComponent } from './details/details.component';
import { ReportsListComponent } from './list/list.component';
import { ReportsComponent } from './reports.component';

export const reportsRoutes: Route[] = [
    {
        path: '',
        component: ReportsComponent,
        resolve: {
            tags: ReportsTagsResolver
        },
        children: [
            {
                path: '',
                component: ReportsListComponent,
                resolve: {
                    tasks: TasksResolver
                },
                children: [
                    {
                        path: ':id',
                        component: ReportsDetailsComponent,
                        resolve: {
                            task: ReportsTaskResolver
                        },
                        canDeactivate: [CanDeactivateTasksDetails]
                    }
                ]
            }
        ]
    }
];
