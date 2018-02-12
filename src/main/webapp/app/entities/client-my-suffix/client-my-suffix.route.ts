import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClientMySuffixComponent } from './client-my-suffix.component';
import { ClientMySuffixDetailComponent } from './client-my-suffix-detail.component';
import { ClientMySuffixPopupComponent } from './client-my-suffix-dialog.component';
import { ClientMySuffixDeletePopupComponent } from './client-my-suffix-delete-dialog.component';

export const clientRoute: Routes = [
    {
        path: 'client-my-suffix',
        component: ClientMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-my-suffix/:id',
        component: ClientMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientPopupRoute: Routes = [
    {
        path: 'client-my-suffix-new',
        component: ClientMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.client.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-my-suffix/:id/edit',
        component: ClientMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.client.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-my-suffix/:id/delete',
        component: ClientMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.client.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
