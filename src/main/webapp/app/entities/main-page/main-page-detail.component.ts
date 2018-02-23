import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { MainPage } from './main-page.model';
import { MainPageService } from './main-page.service';

@Component({
    selector: 'jhi-main-page-detail',
    templateUrl: './main-page-detail.component.html'
})
export class MainPageDetailComponent implements OnInit, OnDestroy {

    mainPage: MainPage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private mainPageService: MainPageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMainPages();
    }

    load(id) {
        this.mainPageService.find(id).subscribe((mainPage) => {
            this.mainPage = mainPage;
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

    registerChangeInMainPages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mainPageListModification',
            (response) => this.load(this.mainPage.id)
        );
    }
}
