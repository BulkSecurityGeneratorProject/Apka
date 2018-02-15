import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

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
        RouterModule.forChild(ENTITY_STATES),
        BrowserModule,
        CommonModule,
         FormsModule,
         AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBhWyfqTQDFGWvAlVMrHRfba1FQlz9z754'
          })
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
