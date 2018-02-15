import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomMySuffix } from './room-my-suffix.model';
import { RoomMySuffixService } from './room-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-room-my-suffix',
    templateUrl: './room-my-suffix.component.html'
})
export class RoomMySuffixComponent implements OnInit, OnDestroy {
rooms: RoomMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roomService: RoomMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roomService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rooms = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRooms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RoomMySuffix) {
        return item.id;
    }
    registerChangeInRooms() {
        this.eventSubscriber = this.eventManager.subscribe('roomListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
