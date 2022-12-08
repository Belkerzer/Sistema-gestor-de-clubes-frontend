import { BooleanInput } from "@angular/cdk/coercion";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "app/core/user/user.service";
import { User } from "app/core/user/user.types";
import { ApexOptions } from "ng-apexcharts";
import { Subject, takeUntil } from "rxjs";
import { HomeService } from "./home.service";
import * as XLSX from 'xlsx';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class HomeComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    chartMembers: ApexOptions;
    chartMen: ApexOptions;
    chartWomen: ApexOptions;
    chartTotalMembers: ApexOptions;
    data: any;
    user: User;
    //fileName = 'Resumen.xlsx';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _homeService: HomeService,
        private _router: Router,
        private _userService: UserService
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

        // Get the data
        this._homeService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                },
            }
        };
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
 * Account
 */
    account(): void {
        this._router.navigate(['/administracion/ajustes/cuenta/personal']);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Members
        this.chartMembers = {
            chart: {
                defaultLocale: 'es',
                locales: [{
                    name: 'es',
                    options: {
                        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                        shortDays: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sáb'],
                        toolbar: {                                     
                            download: 'Descargar SVG',
                            selection: 'Selección',
                            selectionZoom: 'Zoom de selección',
                            zoomIn: 'Acercarse',
                            zoomOut: 'Alejarse',
                            pan: 'Panorama',
                            reset: 'Restablecer el zoom'
                        }                        
                    }
                }],
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                width: '100%',
                height: '100%',
                type: 'area',
                toolbar: {                              
                    export: {
                        csv: {
                            filename: 'Resumen de participantes',
                            columnDelimiter: ';',
                            headerCategory: 'Fecha',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: 'Resumen de participantes',
                        },
                        png: {
                            filename: 'Resumen de participantes',
                        }
                    },
                    autoSelected: 'zoom' 
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ['#818CF8'],
            dataLabels: {
                enabled: false
            },
            fill: {
                colors: ['#312E81']
            },
            grid: {
                show: true,
                borderColor: '#334155',
                padding: {
                    top: 10,
                    bottom: -40,
                    left: 0,
                    right: 0
                },
                position: 'back',
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            series: this.data.members.series,
            stroke: {
                width: 2
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                x: {
                    format: 'MMM dd, yyyy'
                },
                y: {
                    formatter: (value: number): string => `${value}`
                }
            },
            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    stroke: {
                        color: '#475569',
                        dashArray: 0,
                        width: 2
                    }
                },
                labels: {
                    offsetY: -20,
                    style: {
                         colors: '#CBD5E1'
                    }
                },
                tickAmount: 20,
                tooltip: {
                    enabled: false
                },
                type: 'datetime'
            },
            yaxis: {
                axisTicks: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                min: (min): number => min - 750,
                max: (max): number => max + 250,
                tickAmount: 5,
                show: false
            }
        };

        // Men
        this.chartMen = {
            chart: {
                defaultLocale: 'es',
                locales: [{
                    name: 'es',
                    options: {
                        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                        shortDays: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sáb'],
                        toolbar: {                            
                            download: 'Descargar SVG',
                            selection: 'Selección',
                            selectionZoom: 'Zoom de selección',
                            zoomIn: 'Acercarse',
                            zoomOut: 'Alejarse',
                            pan: 'Panorama',
                            reset: 'Restablecer el zoom',
                        }
                    }
                }],
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#38BDF8'],
            fill: {
                colors: ['#38BDF8'],
                opacity: 0.5
            },
            series: this.data.men.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.men.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => val.toString()
                }
            }
        };

        // Women
        this.chartWomen = {
            chart: {
                defaultLocale: 'es',
                locales: [{
                    name: 'es',
                    options: {
                        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                        shortDays: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sáb'],
                        toolbar: {
                            download: 'Descargar SVG',
                            selection: 'Selección',
                            selectionZoom: 'Zoom de selección',
                            zoomIn: 'Acercarse',
                            zoomOut: 'Alejarse',
                            pan: 'Panorama',
                            reset: 'Restablecer el zoom',
                        }
                    }
                }],
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#34D399'],
            fill: {
                colors: ['#34D399'],
                opacity: 0.5
            },
            series: this.data.women.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.women.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => val.toString()
                }
            }
        };

        // Total Members
        this.chartTotalMembers = {
            chart: {
                defaultLocale: 'es',
                locales: [{
                    name: 'es',
                    options: {
                        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                        shortDays: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vie', 'Sáb'],
                        toolbar: {
                            download: 'Descargar SVG',
                            selection: 'Selección',
                            selectionZoom: 'Zoom de selección',
                            zoomIn: 'Acercarse',
                            zoomOut: 'Alejarse',
                            pan: 'Panorama',
                            reset: 'Restablecer el zoom',
                        }
                    }
                }],
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#FB7185'],
            fill: {
                colors: ['#FB7185'],
                opacity: 0.5
            },
            series: this.data.totalMembers.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.totalMembers.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => val.toString()
                }
            }
        };
    }

    //exportExcel(): void {
        /* table id is passed over here */
        //let element = document.getElementById('resumen-table');
        //const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        //const wb: XLSX.WorkBook = XLSX.utils.book_new();
        //XLSX.utils.book_append_sheet(wb, ws, 'Resumen');

        /* save to file */
      //  XLSX.writeFile(wb, this.fileName);
    //}


}
