import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReservationMySuffixComponent } from './reservation-my-suffix.component';
import { ReservationMySuffixDetailComponent } from './reservation-my-suffix-detail.component';
import { ReservationMySuffixPopupComponent } from './reservation-my-suffix-dialog.component';
import { ReservationMySuffixDeletePopupComponent } from './reservation-my-suffix-delete-dialog.component';

export const reservationRoute: Routes = [
    {
        path: 'reservation-my-suffix',
        component: ReservationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.reservation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reservation-my-suffix/:id',
        component: ReservationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.reservation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reservationPopupRoute: Routes = [
    {
        path: 'reservation-my-suffix-new',
        component: ReservationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.reservation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reservation-my-suffix/:id/edit',
        component: ReservationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.reservation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reservation-my-suffix/:id/delete',
        component: ReservationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.reservation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
