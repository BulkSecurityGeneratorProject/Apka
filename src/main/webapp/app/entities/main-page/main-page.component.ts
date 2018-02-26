import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { MainPage } from './main-page.model';
import { MainPageService } from './main-page.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-main-page',
    templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {
mainPages: MainPage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mainPageService: MainPageService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mainPageService.query().subscribe(
            (res: ResponseWrapper) => {
                this.mainPages = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMainPages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MainPage) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInMainPages() {
        this.eventSubscriber = this.eventManager.subscribe('mainPageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
