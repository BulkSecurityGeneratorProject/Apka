import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { JhipsterSharedModule } from '../../shared';
import { DemoUtilsModule } from '../reservation-utils/module';
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
        RouterModule.forChild(ENTITY_STATES),
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
DemoUtilsModule
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
export class JhipsterReservationMySuffixModule {
}
