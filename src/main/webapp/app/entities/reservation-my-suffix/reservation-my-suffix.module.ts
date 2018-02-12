import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ReservationMySuffixService,
    ReservationMySuffixPopupService,
    ReservationMySuffixComponent,
    ReservationMySuffixDetailComponent,
    ReservationMySuffixDialogComponent,
    ReservationMySuffixPopupComponent,
    ReservationMySuffixDeletePopupComponent,
    ReservationMySuffixDeleteDialogComponent,
    reservationRoute,
    reservationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...reservationRoute,
    ...reservationPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReservationMySuffixComponent,
        ReservationMySuffixDetailComponent,
        ReservationMySuffixDialogComponent,
        ReservationMySuffixDeleteDialogComponent,
        ReservationMySuffixPopupComponent,
        ReservationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ReservationMySuffixComponent,
        ReservationMySuffixDialogComponent,
        ReservationMySuffixPopupComponent,
        ReservationMySuffixDeleteDialogComponent,
        ReservationMySuffixDeletePopupComponent,
    ],
    providers: [
        ReservationMySuffixService,
        ReservationMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterReservationMySuffixModule {}
