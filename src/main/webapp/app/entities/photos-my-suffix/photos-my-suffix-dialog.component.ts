import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { PhotosMySuffix } from './photos-my-suffix.model';
import { PhotosMySuffixPopupService } from './photos-my-suffix-popup.service';
import { PhotosMySuffixService } from './photos-my-suffix.service';
import { RoomMySuffix, RoomMySuffixService } from '../room-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-photos-my-suffix-dialog',
    templateUrl: './photos-my-suffix-dialog.component.html'
})
export class PhotosMySuffixDialogComponent implements OnInit {

    photos: PhotosMySuffix;
    isSaving: boolean;

    rooms: RoomMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private photosService: PhotosMySuffixService,
        private roomService: RoomMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roomService.query()
            .subscribe((res: ResponseWrapper) => { this.rooms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.photos, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.photos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.photosService.update(this.photos));
        } else {
            this.subscribeToSaveResponse(
                this.photosService.create(this.photos));
        }
    }

    private subscribeToSaveResponse(result: Observable<PhotosMySuffix>) {
        result.subscribe((res: PhotosMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PhotosMySuffix) {
        this.eventManager.broadcast({ name: 'photosListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoomById(index: number, item: RoomMySuffix) {
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
    selector: 'jhi-photos-my-suffix-popup',
    template: ''
})
export class PhotosMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private photosPopupService: PhotosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.photosPopupService
                    .open(PhotosMySuffixDialogComponent as Component, params['id']);
            } else {
                this.photosPopupService
                    .open(PhotosMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
