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
    RoomMySuffixImgPopupComponent,
    RoomMySuffixDeleteDialogComponent,
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
        RoomMySuffixImgComponent,
        RoomMySuffixPopupComponent,
        RoomMySuffixDeletePopupComponent,
        RoomMySuffixImgPopupComponent,
    ],
    entryComponents: [
        RoomMySuffixComponent,
        RoomMySuffixDialogComponent,
        RoomMySuffixPopupComponent,
        RoomMySuffixDeleteDialogComponent,
        RoomMySuffixImgComponent,
        RoomMySuffixDeletePopupComponent,
        RoomMySuffixImgPopupComponent,
    ],
    providers: [
        RoomMySuffixService,
        RoomMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterRoomMySuffixModule {}
