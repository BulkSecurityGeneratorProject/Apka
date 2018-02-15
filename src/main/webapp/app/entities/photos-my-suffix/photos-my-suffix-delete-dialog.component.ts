import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PhotosMySuffix } from './photos-my-suffix.model';
import { PhotosMySuffixPopupService } from './photos-my-suffix-popup.service';
import { PhotosMySuffixService } from './photos-my-suffix.service';

@Component({
    selector: 'jhi-photos-my-suffix-delete-dialog',
    templateUrl: './photos-my-suffix-delete-dialog.component.html'
})
export class PhotosMySuffixDeleteDialogComponent {

    photos: PhotosMySuffix;

    constructor(
        private photosService: PhotosMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.photosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'photosListModification',
                content: 'Deleted an photos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-photos-my-suffix-delete-popup',
    template: ''
})
export class PhotosMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private photosPopupService: PhotosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.photosPopupService
                .open(PhotosMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
