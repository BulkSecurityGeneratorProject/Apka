import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReservationMySuffix } from './reservation-my-suffix.model';
import { ReservationMySuffixService } from './reservation-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-reservation-my-suffix',
    templateUrl: './reservation-my-suffix.component.html'
})
export class ReservationMySuffixComponent implements OnInit, OnDestroy {
reservations: ReservationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reservationService: ReservationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.reservationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.reservations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReservations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReservationMySuffix) {
        return item.id;
    }
    registerChangeInReservations() {
        this.eventSubscriber = this.eventManager.subscribe('reservationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    convertFromID(tableEntity, resID){
        for(var i = 0; tableEntity.length > i; i++){
            if(tableEntity[i].id == resID){
                if(tableEntity == "this.rooms"){
                    return tableEntity[i].roomNumber;
                }
                else{
                    return (tableEntity[i].name+" "+tableEntity[i].surname);
                }
            }
        }
    }

}
