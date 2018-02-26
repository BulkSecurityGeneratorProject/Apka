import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MainPage } from './main-page.model';
import { MainPagePopupService } from './main-page-popup.service';
import { MainPageService } from './main-page.service';

@Component({
    selector: 'jhi-main-page-delete-dialog',
    templateUrl: './main-page-delete-dialog.component.html'
})
export class MainPageDeleteDialogComponent {

    mainPage: MainPage;

    constructor(
        private mainPageService: MainPageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mainPageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mainPageListModification',
                content: 'Deleted an mainPage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-main-page-delete-popup',
    template: ''
})
export class MainPageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainPagePopupService: MainPagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mainPagePopupService
                .open(MainPageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
