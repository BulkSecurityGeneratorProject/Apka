import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterRoomMySuffixModule } from './room-my-suffix/room-my-suffix.module';
import { JhipsterReservationMySuffixModule } from './reservation-my-suffix/reservation-my-suffix.module';
import { JhipsterClientMySuffixModule } from './client-my-suffix/client-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterRoomMySuffixModule,
        JhipsterReservationMySuffixModule,
        JhipsterClientMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
