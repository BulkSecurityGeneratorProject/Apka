import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    RoomMySuffixService,
    RoomMySuffixPopupService,
    RoomMySuffixComponent,
    RoomMySuffixDetailComponent,
    RoomMySuffixDialogComponent,
    RoomMySuffixPopupComponent,
    RoomMySuffixDeletePopupComponent,
    RoomMySuffixDeleteDialogComponent,
    RoomMySuffixImgPopupComponent,
    RoomMySuffixImgComponent,
    roomRoute,
    roomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...roomRoute,
    ...roomPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoomMySuffixComponent,
        RoomMySuffixDetailComponent,
        RoomMySuffixDialogComponent,
        RoomMySuffixDeleteDialogComponent,
        RoomMySuffixPopupComponent,
        RoomMySuffixDeletePopupComponent,
        RoomMySuffixImgPopupComponent,
        RoomMySuffixImgComponent,
    ],
    entryComponents: [
        RoomMySuffixComponent,
        RoomMySuffixDialogComponent,
        RoomMySuffixPopupComponent,
        RoomMySuffixDeleteDialogComponent,
        RoomMySuffixDeletePopupComponent,
        RoomMySuffixImgComponent,
        RoomMySuffixImgPopupComponent,
    ],
    providers: [
        RoomMySuffixService,
        RoomMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterRoomMySuffixModule {}
