import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterRoomMySuffixModule } from './room-my-suffix/room-my-suffix.module';
import { JhipsterReservationMySuffixModule } from './reservation-my-suffix/reservation-my-suffix.module';
import { JhipsterClientMySuffixModule } from './client-my-suffix/client-my-suffix.module';
import { JhipsterContactMySuffixModule } from './contact-my-suffix/contact-my-suffix.module';
import { JhipsterPhotosMySuffixModule } from './photos-my-suffix/photos-my-suffix.module';
import { JhipsterMainPageModule } from './main-page/main-page.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterRoomMySuffixModule,
        JhipsterReservationMySuffixModule,
        JhipsterClientMySuffixModule,
        JhipsterContactMySuffixModule,
        JhipsterPhotosMySuffixModule,
        JhipsterMainPageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
