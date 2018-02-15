import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContactMySuffixComponent } from './contact-my-suffix.component';
import { ContactMySuffixDetailComponent } from './contact-my-suffix-detail.component';
import { ContactMySuffixPopupComponent } from './contact-my-suffix-dialog.component';
import { ContactMySuffixDeletePopupComponent } from './contact-my-suffix-delete-dialog.component';

export const contactRoute: Routes = [
    {
        path: 'contact-my-suffix',
        component: ContactMySuffixComponent,
        data: {

            pageTitle: 'jhipsterApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contact-my-suffix/:id',
        component: ContactMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPopupRoute: Routes = [
    {
        path: 'contact-my-suffix-new',
        component: ContactMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-my-suffix/:id/edit',
        component: ContactMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-my-suffix/:id/delete',
        component: ContactMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
