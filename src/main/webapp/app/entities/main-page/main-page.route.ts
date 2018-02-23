import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MainPageComponent } from './main-page.component';
import { MainPageDetailComponent } from './main-page-detail.component';
import { MainPagePopupComponent } from './main-page-dialog.component';
import { MainPageDeletePopupComponent } from './main-page-delete-dialog.component';

export const mainPageRoute: Routes = [
    {
        path: 'main-page',
        component: MainPageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mainPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'main-page/:id',
        component: MainPageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mainPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mainPagePopupRoute: Routes = [
    {
        path: 'main-page-new',
        component: MainPagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mainPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-page/:id/edit',
        component: MainPagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mainPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-page/:id/delete',
        component: MainPageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mainPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
