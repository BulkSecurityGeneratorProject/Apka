import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Client e2e test', () => {

    let navBarPage: NavBarPage;
    let clientDialogPage: ClientDialogPage;
    let clientComponentsPage: ClientComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clients', () => {
        navBarPage.goToEntity('client-my-suffix');
        clientComponentsPage = new ClientComponentsPage();
        expect(clientComponentsPage.getTitle())
            .toMatch(/jhipsterApp.client.home.title/);

    });

    it('should load create Client dialog', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage = new ClientDialogPage();
        expect(clientDialogPage.getModalTitle())
            .toMatch(/jhipsterApp.client.home.createOrEditLabel/);
        clientDialogPage.close();
    });

    it('should create and save Clients', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage.setNameInput('name');
        expect(clientDialogPage.getNameInput()).toMatch('name');
        clientDialogPage.setSurnameInput('surname');
        expect(clientDialogPage.getSurnameInput()).toMatch('surname');
        clientDialogPage.setPhoneNumberInput('5');
        expect(clientDialogPage.getPhoneNumberInput()).toMatch('5');
        clientDialogPage.setEmailAdressInput('emailAdress');
        expect(clientDialogPage.getEmailAdressInput()).toMatch('emailAdress');
        clientDialogPage.save();
        expect(clientDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClientComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-client-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClientDialogPage {
    modalTitle = element(by.css('h4#myClientLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    surnameInput = element(by.css('input#field_surname'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    emailAdressInput = element(by.css('input#field_emailAdress'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setSurnameInput = function(surname) {
        this.surnameInput.sendKeys(surname);
    }

    getSurnameInput = function() {
        return this.surnameInput.getAttribute('value');
    }

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    }

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    }

    setEmailAdressInput = function(emailAdress) {
        this.emailAdressInput.sendKeys(emailAdress);
    }

    getEmailAdressInput = function() {
        return this.emailAdressInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
