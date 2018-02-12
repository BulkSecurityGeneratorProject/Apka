import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReservationMySuffix } from './reservation-my-suffix.model';
import { ReservationMySuffixPopupService } from './reservation-my-suffix-popup.service';
import { ReservationMySuffixService } from './reservation-my-suffix.service';
import { ClientMySuffix, ClientMySuffixService } from '../client-my-suffix';
import { RoomMySuffix, RoomMySuffixService } from '../room-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-reservation-my-suffix-dialog',
    templateUrl: './reservation-my-suffix-dialog.component.html'
})
export class ReservationMySuffixDialogComponent implements OnInit {

    reservation: ReservationMySuffix;
    isSaving: boolean;

    clients: ClientMySuffix[];

    rooms: RoomMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reservationService: ReservationMySuffixService,
        private clientService: ClientMySuffixService,
        private roomService: RoomMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: ResponseWrapper) => { this.clients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.roomService.query()
            .subscribe((res: ResponseWrapper) => { this.rooms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reservation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reservationService.update(this.reservation));
        } else {
            this.subscribeToSaveResponse(
                this.reservationService.create(this.reservation));
        }
    }

    private subscribeToSaveResponse(result: Observable<ReservationMySuffix>) {
        result.subscribe((res: ReservationMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ReservationMySuffix) {
        this.eventManager.broadcast({ name: 'reservationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: ClientMySuffix) {
        return item.id;
    }

    trackRoomById(index: number, item: RoomMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-reservation-my-suffix-popup',
    template: ''
})
export class ReservationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reservationPopupService: ReservationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reservationPopupService
                    .open(ReservationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.reservationPopupService
                    .open(ReservationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
