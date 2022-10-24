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
        id: 'participantes',
        title: 'Participantes',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/participantes'
    },
    {
        id: 'clubes',
        title: 'Clubes',
        type: 'basic',
        icon: 'heroicons_outline:globe-alt',
        link: '/clubes'
    },
    {
        id: 'scrumboard',
        title: 'Actividades',
        type: 'basic',
        icon: 'heroicons_outline:view-boards',
        link: '/actividades'
    },
    {
        id: 'reportes',
        title: 'Reportes',
        type: 'basic',
        icon: 'heroicons_outline:document-report',
        link: '/reportes'    
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
