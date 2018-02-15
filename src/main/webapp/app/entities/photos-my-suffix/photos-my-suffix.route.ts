import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PhotosMySuffixComponent } from './photos-my-suffix.component';
import { PhotosMySuffixDetailComponent } from './photos-my-suffix-detail.component';
import { PhotosMySuffixPopupComponent } from './photos-my-suffix-dialog.component';
import { PhotosMySuffixDeletePopupComponent } from './photos-my-suffix-delete-dialog.component';

export const photosRoute: Routes = [
    {
        path: 'photos-my-suffix',
        component: PhotosMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.photos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'photos-my-suffix/:id',
        component: PhotosMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.photos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const photosPopupRoute: Routes = [
    {
        path: 'photos-my-suffix-new',
        component: PhotosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.photos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'photos-my-suffix/:id/edit',
        component: PhotosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.photos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'photos-my-suffix/:id/delete',
        component: PhotosMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.photos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
