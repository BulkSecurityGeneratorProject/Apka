import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReservationMySuffix } from './reservation-my-suffix.model';
import { ReservationMySuffixService } from './reservation-my-suffix.service';

@Component({
    selector: 'jhi-reservation-my-suffix-detail',
    templateUrl: './reservation-my-suffix-detail.component.html'
})
export class ReservationMySuffixDetailComponent implements OnInit, OnDestroy {

    reservation: ReservationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reservationService: ReservationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReservations();
    }

    load(id) {
        this.reservationService.find(id).subscribe((reservation) => {
            this.reservation = reservation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReservations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reservationListModification',
            (response) => this.load(this.reservation.id)
        );
    }
}
