import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContactMySuffix } from './contact-my-suffix.model';
import { ContactMySuffixService } from './contact-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contact-my-suffix',
    templateUrl: './contact-my-suffix.component.html',
styleUrls:['contact.scss']

})
export class ContactMySuffixComponent implements OnInit, OnDestroy {
contacts: ContactMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

     title: string = 'My first AGM project';
  lat: number = 53.663269;
  lng: number = 22.943042;

    constructor(
        private contactService: ContactMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contactService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contacts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ContactMySuffix) {
        return item.id;
    }
    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe('contactListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
