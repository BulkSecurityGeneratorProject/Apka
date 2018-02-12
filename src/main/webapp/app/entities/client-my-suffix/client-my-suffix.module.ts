import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ClientMySuffixService,
    ClientMySuffixPopupService,
    ClientMySuffixComponent,
    ClientMySuffixDetailComponent,
    ClientMySuffixDialogComponent,
    ClientMySuffixPopupComponent,
    ClientMySuffixDeletePopupComponent,
    ClientMySuffixDeleteDialogComponent,
    clientRoute,
    clientPopupRoute,
} from './';

const ENTITY_STATES = [
    ...clientRoute,
    ...clientPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClientMySuffixComponent,
        ClientMySuffixDetailComponent,
        ClientMySuffixDialogComponent,
        ClientMySuffixDeleteDialogComponent,
        ClientMySuffixPopupComponent,
        ClientMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ClientMySuffixComponent,
        ClientMySuffixDialogComponent,
        ClientMySuffixPopupComponent,
        ClientMySuffixDeleteDialogComponent,
        ClientMySuffixDeletePopupComponent,
    ],
    providers: [
        ClientMySuffixService,
        ClientMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterClientMySuffixModule {}
