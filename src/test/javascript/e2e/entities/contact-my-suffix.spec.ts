import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contact e2e test', () => {

    let navBarPage: NavBarPage;
    let contactDialogPage: ContactDialogPage;
    let contactComponentsPage: ContactComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contacts', () => {
        navBarPage.goToEntity('contact-my-suffix');
        contactComponentsPage = new ContactComponentsPage();
        expect(contactComponentsPage.getTitle())
            .toMatch(/jhipsterApp.contact.home.title/);

    });

    it('should load create Contact dialog', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage = new ContactDialogPage();
        expect(contactDialogPage.getModalTitle())
            .toMatch(/jhipsterApp.contact.home.createOrEditLabel/);
        contactDialogPage.close();
    });

    it('should create and save Contacts', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage.setLocalNameInput('localName');
        expect(contactDialogPage.getLocalNameInput()).toMatch('localName');
        contactDialogPage.setPhoneNumberInput('5');
        expect(contactDialogPage.getPhoneNumberInput()).toMatch('5');
        contactDialogPage.setEmailAdressInput('emailAdress');
        expect(contactDialogPage.getEmailAdressInput()).toMatch('emailAdress');
        contactDialogPage.setAdressInput('adress');
        expect(contactDialogPage.getAdressInput()).toMatch('adress');
        contactDialogPage.save();
        expect(contactDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContactComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contact-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContactDialogPage {
    modalTitle = element(by.css('h4#myContactLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    localNameInput = element(by.css('input#field_localName'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    emailAdressInput = element(by.css('input#field_emailAdress'));
    adressInput = element(by.css('input#field_adress'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLocalNameInput = function(localName) {
        this.localNameInput.sendKeys(localName);
    }

    getLocalNameInput = function() {
        return this.localNameInput.getAttribute('value');
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

    setAdressInput = function(adress) {
        this.adressInput.sendKeys(adress);
    }

    getAdressInput = function() {
        return this.adressInput.getAttribute('value');
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
