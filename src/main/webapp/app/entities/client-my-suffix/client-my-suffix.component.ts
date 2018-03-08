import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientMySuffix } from './client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-client-my-suffix',
    templateUrl: './client-my-suffix.component.html'
})
export class ClientMySuffixComponent implements OnInit, OnDestroy {
clients: ClientMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clientService: ClientMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clientService.query().subscribe(
            (res: ResponseWrapper) => {
                this.clients = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ClientMySuffix) {
        return item.id;
    }
    registerChangeInClients() {
        this.eventSubscriber = this.eventManager.subscribe('clientListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    getRealId(clientID){

            for( let i = 0; i < this.clients.length; i++){
                if(clientID == this.clients[i].id){
                    return (i+1);
                }
            }
            return 99;
    }

}
