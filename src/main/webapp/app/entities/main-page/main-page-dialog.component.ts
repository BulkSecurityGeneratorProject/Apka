import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { MainPage } from './main-page.model';
import { MainPagePopupService } from './main-page-popup.service';
import { MainPageService } from './main-page.service';

@Component({
    selector: 'jhi-main-page-dialog',
    templateUrl: './main-page-dialog.component.html'
})
export class MainPageDialogComponent implements OnInit {

    mainPage: MainPage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private mainPageService: MainPageService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        this.dataUtils.clearInputImage(this.mainPage, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mainPage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mainPageService.update(this.mainPage));
        } else {
            this.subscribeToSaveResponse(
                this.mainPageService.create(this.mainPage));
        }
    }

    private subscribeToSaveResponse(result: Observable<MainPage>) {
        result.subscribe((res: MainPage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MainPage) {
        this.eventManager.broadcast({ name: 'mainPageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-main-page-popup',
    template: ''
})
export class MainPagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainPagePopupService: MainPagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mainPagePopupService
                    .open(MainPageDialogComponent as Component, params['id']);
            } else {
                this.mainPagePopupService
                    .open(MainPageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
