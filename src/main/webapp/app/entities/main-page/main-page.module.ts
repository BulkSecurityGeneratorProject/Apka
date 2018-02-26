import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    MainPageService,
    MainPagePopupService,
    MainPageComponent,
    MainPageDetailComponent,
    MainPageDialogComponent,
    MainPagePopupComponent,
    MainPageDeletePopupComponent,
    MainPageDeleteDialogComponent,
    mainPageRoute,
    mainPagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...mainPageRoute,
    ...mainPagePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MainPageComponent,
        MainPageDetailComponent,
        MainPageDialogComponent,
        MainPageDeleteDialogComponent,
        MainPagePopupComponent,
        MainPageDeletePopupComponent,
    ],
    entryComponents: [
        MainPageComponent,
        MainPageDialogComponent,
        MainPagePopupComponent,
        MainPageDeleteDialogComponent,
        MainPageDeletePopupComponent,
    ],
    providers: [
        MainPageService,
        MainPagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMainPageModule {}
