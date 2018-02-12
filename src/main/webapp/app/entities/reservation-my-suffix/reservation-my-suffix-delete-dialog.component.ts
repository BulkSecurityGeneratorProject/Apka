import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReservationMySuffix } from './reservation-my-suffix.model';
import { ReservationMySuffixPopupService } from './reservation-my-suffix-popup.service';
import { ReservationMySuffixService } from './reservation-my-suffix.service';

@Component({
    selector: 'jhi-reservation-my-suffix-delete-dialog',
    templateUrl: './reservation-my-suffix-delete-dialog.component.html'
})
export class ReservationMySuffixDeleteDialogComponent {

    reservation: ReservationMySuffix;

    constructor(
        private reservationService: ReservationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reservationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reservationListModification',
                content: 'Deleted an reservation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reservation-my-suffix-delete-popup',
    template: ''
})
export class ReservationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reservationPopupService: ReservationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reservationPopupService
                .open(ReservationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
