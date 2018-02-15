import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ContactMySuffixService,
    ContactMySuffixPopupService,
    ContactMySuffixComponent,
    ContactMySuffixDetailComponent,
    ContactMySuffixDialogComponent,
    ContactMySuffixPopupComponent,
    ContactMySuffixDeletePopupComponent,
    ContactMySuffixDeleteDialogComponent,
    contactRoute,
    contactPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contactRoute,
    ...contactPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContactMySuffixComponent,
        ContactMySuffixDetailComponent,
        ContactMySuffixDialogComponent,
        ContactMySuffixDeleteDialogComponent,
        ContactMySuffixPopupComponent,
        ContactMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ContactMySuffixComponent,
        ContactMySuffixDialogComponent,
        ContactMySuffixPopupComponent,
        ContactMySuffixDeleteDialogComponent,
        ContactMySuffixDeletePopupComponent,
    ],
    providers: [
        ContactMySuffixService,
        ContactMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterContactMySuffixModule {}
