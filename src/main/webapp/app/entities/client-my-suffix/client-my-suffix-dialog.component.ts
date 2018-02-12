import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientMySuffix } from './client-my-suffix.model';
import { ClientMySuffixPopupService } from './client-my-suffix-popup.service';
import { ClientMySuffixService } from './client-my-suffix.service';

@Component({
    selector: 'jhi-client-my-suffix-dialog',
    templateUrl: './client-my-suffix-dialog.component.html'
})
export class ClientMySuffixDialogComponent implements OnInit {

    client: ClientMySuffix;
    isSaving: boolean;

    color = "red";
    show = true;

    isTyping = [true, true, true, true];
    Typing(i,logic){
        this.isTyping[i] = logic;
    }

    constructor(
        public activeModal: NgbActiveModal,
        private clientService: ClientMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.client.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientService.update(this.client));
        } else {
            this.subscribeToSaveResponse(
                this.clientService.create(this.client));
        }
    }

    private subscribeToSaveResponse(result: Observable<ClientMySuffix>) {
        result.subscribe((res: ClientMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ClientMySuffix) {
        this.eventManager.broadcast({ name: 'clientListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-client-my-suffix-popup',
    template: ''
})
export class ClientMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientPopupService: ClientMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientPopupService
                    .open(ClientMySuffixDialogComponent as Component, params['id']);
            } else {
                this.clientPopupService
                    .open(ClientMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
