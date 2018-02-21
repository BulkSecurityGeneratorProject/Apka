import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Account, LoginModalService, Principal, ResponseWrapper } from '../shared';

import { ContactMySuffix } from '../entities/contact-my-suffix/contact-my-suffix.model';
import { ContactMySuffixService } from '../entities/contact-my-suffix/contact-my-suffix.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    contacts: ContactMySuffix[];

    constructor(
        private contactService: ContactMySuffixService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
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
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
