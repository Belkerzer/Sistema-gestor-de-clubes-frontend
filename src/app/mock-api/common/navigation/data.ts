/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon: 'heroicons_outline:home',
        link: '/inicio'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/inicio'
    },
    {
        id: 'integrantes',
        title: 'Integrantes',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/integrantes'
    },
    {
        id: 'clubes',
        title: 'Clubes',
        type: 'basic',
        icon: 'heroicons_outline:globe-alt',
        link: '/clubes'
    },
    /*     {
            id   : 'planes',
            title: 'Planes',
            type : 'basic',
            icon : 'heroicons_outline:calendar',
            link : '/planes'
        }, */
    {
        id: 'reportes',
        title: 'Reportes',
        type: 'basic',
        icon: 'heroicons_outline:document-report',
        link: '/reportes',
        disabled: true
    },
    /*     {
            id: 'administracion',
            title: 'Administración',
            type: 'basic',
            icon: 'heroicons_outline:cog',
            link: '/administracion'
        }, */
    {
        id: 'administracion',
        title: 'Administración',
        type: 'basic',
        icon: 'heroicons_outline:cog',
        link: '/administracion',
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
