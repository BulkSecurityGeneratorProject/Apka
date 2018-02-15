import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { PhotosMySuffix } from './photos-my-suffix.model';
import { PhotosMySuffixService } from './photos-my-suffix.service';

@Component({
    selector: 'jhi-photos-my-suffix-detail',
    templateUrl: './photos-my-suffix-detail.component.html'
})
export class PhotosMySuffixDetailComponent implements OnInit, OnDestroy {

    photos: PhotosMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private photosService: PhotosMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhotos();
    }

    load(id) {
        this.photosService.find(id).subscribe((photos) => {
            this.photos = photos;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhotos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'photosListModification',
            (response) => this.load(this.photos.id)
        );
    }
}
