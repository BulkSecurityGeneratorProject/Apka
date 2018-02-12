import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClientMySuffix } from './client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';

@Component({
    selector: 'jhi-client-my-suffix-detail',
    templateUrl: './client-my-suffix-detail.component.html'
})
export class ClientMySuffixDetailComponent implements OnInit, OnDestroy {

    client: ClientMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clientService: ClientMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClients();
    }

    load(id) {
        this.clientService.find(id).subscribe((client) => {
            this.client = client;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClients() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientListModification',
            (response) => this.load(this.client.id)
        );
    }
}
