import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import './moment.es.ec.ts';
moment.locale('es-EC');
import moment from 'moment';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { DatepickerEsp } from './datepicker-esp';
import { registerLocaleData } from '@angular/common';
import localeEsEC from '@angular/common/locales/es-EC';
import { HttpPetitionInterceptor } from './Interceptor/httpPetition.interceptor';

registerLocaleData(localeEsEC, 'es-EC');

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

        HttpClientModule,

        TranslocoRootModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-EC' },
        {
            provide : HTTP_INTERCEPTORS,
            useClass: HttpPetitionInterceptor,
            multi   : true
        },
        { provide: MatDatepickerIntl, useClass: DatepickerEsp },
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
    ]
})
export class AppModule
{
}
