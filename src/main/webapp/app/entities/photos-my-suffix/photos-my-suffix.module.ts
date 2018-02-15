import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    PhotosMySuffixService,
    PhotosMySuffixPopupService,
    PhotosMySuffixComponent,
    PhotosMySuffixDetailComponent,
    PhotosMySuffixDialogComponent,
    PhotosMySuffixPopupComponent,
    PhotosMySuffixDeletePopupComponent,
    PhotosMySuffixDeleteDialogComponent,
    photosRoute,
    photosPopupRoute,
} from './';

const ENTITY_STATES = [
    ...photosRoute,
    ...photosPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhotosMySuffixComponent,
        PhotosMySuffixDetailComponent,
        PhotosMySuffixDialogComponent,
        PhotosMySuffixDeleteDialogComponent,
        PhotosMySuffixPopupComponent,
        PhotosMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PhotosMySuffixComponent,
        PhotosMySuffixDialogComponent,
        PhotosMySuffixPopupComponent,
        PhotosMySuffixDeleteDialogComponent,
        PhotosMySuffixDeletePopupComponent,
    ],
    providers: [
        PhotosMySuffixService,
        PhotosMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterPhotosMySuffixModule {}
