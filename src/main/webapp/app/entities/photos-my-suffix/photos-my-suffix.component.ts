import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { PhotosMySuffix } from './photos-my-suffix.model';
import { PhotosMySuffixService } from './photos-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-photos-my-suffix',
    templateUrl: './photos-my-suffix.component.html'
})
export class PhotosMySuffixComponent implements OnInit, OnDestroy {
photos: PhotosMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private photosService: PhotosMySuffixService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.photosService.query().subscribe(
            (res: ResponseWrapper) => {
                this.photos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPhotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PhotosMySuffix) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInPhotos() {
        this.eventSubscriber = this.eventManager.subscribe('photosListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    getRealId(photoID){

            for( let i = 0; i < this.photos.length; i++){
                if(photoID == this.photos[i].id){
                    return (i+1);
                }
            }
            return 99;
    }

}
