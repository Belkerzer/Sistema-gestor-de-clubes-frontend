import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
/* import { MatDialog } from '@angular/material/dialog'; */
import { Subject } from 'rxjs';
/* import { takeUntil } from 'rxjs/operators'; */
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { AdminService } from 'app/modules/admin/admin/admin.service';
/* import { MailboxComposeComponent } from 'app/modules/admin/mailbox/compose/compose.component'; */
/* import { labelColorDefs } from 'app/modules/admin/mailbox/mailbox.constants'; */
import { MailFilter, MailFolder, MailLabel } from 'app/modules/admin/admin/admin.types';

@Component({
    selector: 'mailbox-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
    filters: MailFilter[];
    folders: MailFolder[];
    labels: MailLabel[];
    menuData: FuseNavigationItem[] = [];
    private _filtersMenuData: FuseNavigationItem[] = [];
    private _foldersMenuData: FuseNavigationItem[] = [];
    private _labelsMenuData: FuseNavigationItem[] = [];
    private _otherMenuData: FuseNavigationItem[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _adminService: AdminService,
        private _fuseNavigationService: FuseNavigationService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Setup available panels
        this.menuData = [
            {
                id: 'acciones',
                title: 'Acciones',
                subtitle: 'Integrante, club y equipo',
                type: 'group',
                children: [
                    {
                        id: 'crear-integrante',
                        title: 'Crear integrante',
                        type: 'basic',
                        icon: 'heroicons_outline:plus-circle'
                    },
                    {
                        id: 'crear-equipo',
                        title: 'Crear equipo',
                        type: 'basic',
                        icon: 'heroicons_outline:user-group'
                    },
                    {
                        id: 'crear-club',
                        title: 'Crear club',
                        type: 'basic',
                        icon: 'heroicons_outline:briefcase'
                    },
                    {
                        id: 'crear-usuario',
                        title: 'Crear usuario',
                        type: 'basic',
                        icon: 'heroicons_outline:user-add'
                    },
                    {
                        id: 'asignar-usuario-o-equipo',
                        title: 'Asignar usuario o equipo',
                        subtitle: 'Asignar a una tarea o a un proyecto',
                        type: 'basic',
                        icon: 'heroicons_outline:badge-check'
                    }
                ]
            },
            {
                id: 'tareas',
                title: 'Tareas',
                type: 'group',
                children: [
                    {
                        id: 'todas-las-tareas',
                        title: 'Todas las tareas',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-list',
                        badge: {
                            title: '49',
                            classes: 'px-2 bg-primary text-on-primary rounded-full'
                        }
                    },
                    {
                        id: 'tareas-en-curso',
                        title: 'Tareas en curso',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-copy'
                    },
                    {
                        id: 'tareas-completadas',
                        title: 'Tareas completadas',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-check'
                    },
                    {
                        id: 'tareas-abandonadas',
                        title: 'Tareas abandonadas',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard'
                    },
                ]
            },
            {
                id: 'ajustes',
                title: 'Ajustes',
                type: 'group',
                children: [
                    {
                        id: 'general',
                        title: 'General',
                        type: 'collapsable',
                        icon: 'heroicons_outline:adjustments',
                        children: [
                            {
                                id: 'tareas',
                                title: 'Tareas',
                                type: 'basic'
                            },
                            {
                                id: 'usuarios',
                                title: 'Usuarios',
                                type: 'basic'
                            },
                            {
                                id: 'equipos',
                                title: 'Equipos',
                                type: 'basic'
                            }
                        ]
                    },
                    {
                        id: 'cuenta',
                        title: 'Cuenta',
                        type: 'collapsable',
                        icon: 'heroicons_outline:user-circle',
                        children: [
                            {
                                id: 'personal',
                                title: 'Personal',
                                type: 'basic',
                                link: '/administracion/personal'
                            },
                            {
                                id: 'seguridad',
                                title: 'Seguridad',
                                type: 'basic',
                                link: '/administracion/seguridad'
                            }
                        ]
                    }
                ]
            }
        ];
        /*         // Filters
                this._mailboxService.filters$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((filters: MailFilter[]) => {
                        this.filters = filters;
        
                        // Generate menu links
                        this._generateFiltersMenuLinks();
                    });
        
                // Folders
                this._mailboxService.folders$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((folders: MailFolder[]) => {
                        this.folders = folders;
        
                        // Generate menu links
                        this._generateFoldersMenuLinks();
        
                        // Update navigation badge
                        this._updateNavigationBadge(folders);
                    });
        
                // Labels
                this._mailboxService.labels$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((labels: MailLabel[]) => {
                        this.labels = labels;
        
                        // Generate menu links
                        this._generateLabelsMenuLinks();
                    });
        
                // Generate other menu links
                this._generateOtherMenuLinks(); */
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
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Generate menus for folders
     *
     * @private
     */
    private _generateFoldersMenuLinks(): void {
        /*         // Reset the folders menu data
                this._foldersMenuData = [];
        
                // Iterate through the folders
                this.folders.forEach((folder) => {
        
                    // Generate menu item for the folder
                    const menuItem: FuseNavigationItem = {
                        id: folder.id,
                        title: folder.title,
                        type: 'basic',
                        icon: folder.icon,
                        link: '/mailbox/' + folder.slug
                    };
        
                    // If the count is available and is bigger than zero...
                    if (folder.count && folder.count > 0) {
                        // Add the count as a badge
                        menuItem['badge'] = {
                            title: folder.count + ''
                        };
                    }
        
                    // Push the menu item to the folders menu data
                    this._foldersMenuData.push(menuItem);
                });
        
                // Update the menu data
                this._updateMenuData(); */
    }

    /**
     * Generate menus for filters
     *
     * @private
     */
    private _generateFiltersMenuLinks(): void {
        /*         // Reset the filters menu
                this._filtersMenuData = [];
        
                // Iterate through the filters
                this.filters.forEach((filter) => {
        
                    // Generate menu item for the filter
                    this._filtersMenuData.push({
                        id: filter.id,
                        title: filter.title,
                        type: 'basic',
                        icon: filter.icon,
                        link: '/mailbox/filter/' + filter.slug
                    });
                });
        
                // Update the menu data
                this._updateMenuData(); */
    }

    /**
     * Generate menus for labels
     *
     * @private
     */
    private _generateLabelsMenuLinks(): void {
        /*         // Reset the labels menu
                this._labelsMenuData = [];
        
                // Iterate through the labels
                this.labels.forEach((label) => {
        
                    // Generate menu item for the label
                    this._labelsMenuData.push({
                        id: label.id,
                        title: label.title,
                        type: 'basic',
                        icon: 'heroicons_outline:tag',
                        classes: {
                            icon: labelColorDefs[label.color].text
                        },
                        link: '/mailbox/label/' + label.slug
                    });
                });
        
                // Update the menu data
                this._updateMenuData(); */
    }

    /**
     * Generate other menus
     *
     * @private
     */
    private _generateOtherMenuLinks(): void {
        /*         // Settings menu
                this._otherMenuData.push({
                    title: 'Settings',
                    type: 'basic',
                    icon: 'heroicons_outline:cog',
                    link: '/mailbox/settings'
                });
        
                // Update the menu data
                this._updateMenuData(); */
    }

    /**
     * Update the menu data
     *
     * @private
     */
    private _updateMenuData(): void {
        /*         this.menuData = [
                    {
                        title: 'ACCIONES',
                        subtitle: 'Integrante, club y equipo',
                        type: 'group',
                        children: [
                            ...this._foldersMenuData
                        ]
                    },
                    {
                        title: 'TAREAS',
                        type: 'group',
                        children: [
                            ...this._filtersMenuData
                        ]
                    },
                    {
                        title: 'AJUSTES',
                        type: 'group',
                        children: [
                            ...this._labelsMenuData
                        ]
                    },
                    {
                        type: 'spacer'
                    },
                    ...this._otherMenuData
                ]; */
    }

    /**
     * Update the navigation badge using the
     * unread count of the inbox folder
     *
     * @param folders
     * @private
     */
    private _updateNavigationBadge(folders: MailFolder[]): void {
        /*         // Get the inbox folder
                const inboxFolder = this.folders.find(folder => folder.slug === 'inbox');
        
                // Get the component -> navigation data -> item
                const mainNavigationComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
        
                // If the main navigation component exists...
                if (mainNavigationComponent) {
                    const mainNavigation = mainNavigationComponent.navigation;
                    const menuItem = this._fuseNavigationService.getItem('apps.mailbox', mainNavigation);
        
                    // Update the badge title of the item
                    menuItem.badge.title = inboxFolder.count + '';
        
                    // Refresh the navigation
                    mainNavigationComponent.refresh();
                } */
    }
}
