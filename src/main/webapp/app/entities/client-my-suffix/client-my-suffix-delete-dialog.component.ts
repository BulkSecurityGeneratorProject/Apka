import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientMySuffix } from './client-my-suffix.model';
import { ClientMySuffixPopupService } from './client-my-suffix-popup.service';
import { ClientMySuffixService } from './client-my-suffix.service';

@Component({
    selector: 'jhi-client-my-suffix-delete-dialog',
    templateUrl: './client-my-suffix-delete-dialog.component.html'
})
export class ClientMySuffixDeleteDialogComponent {

    client: ClientMySuffix;

    constructor(
        private clientService: ClientMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clientListModification',
                content: 'Deleted an client'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-my-suffix-delete-popup',
    template: ''
})
export class ClientMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientPopupService: ClientMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientPopupService
                .open(ClientMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
