import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomMySuffix } from './room-my-suffix.model';
import { RoomMySuffixPopupService } from './room-my-suffix-popup.service';
import { RoomMySuffixService } from './room-my-suffix.service';
import { PhotosMySuffix, PhotosMySuffixService } from '../photos-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-room-my-suffix-dialog',
    templateUrl: './room-my-suffix-dialog.component.html'
})
export class RoomMySuffixDialogComponent implements OnInit {

    room: RoomMySuffix;
    isSaving: boolean;

    photos: PhotosMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roomService: RoomMySuffixService,
        private photosService: PhotosMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.photosService.query()
            .subscribe((res: ResponseWrapper) => { this.photos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.room.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomService.update(this.room));
        } else {
            this.subscribeToSaveResponse(
                this.roomService.create(this.room));
        }
    }

    private subscribeToSaveResponse(result: Observable<RoomMySuffix>) {
        result.subscribe((res: RoomMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomMySuffix) {
        this.eventManager.broadcast({ name: 'roomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPhotosById(index: number, item: PhotosMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-room-my-suffix-popup',
    template: ''
})
export class RoomMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomPopupService
                    .open(RoomMySuffixDialogComponent as Component, params['id']);
            } else {
                this.roomPopupService
                    .open(RoomMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
