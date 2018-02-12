import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Reservation e2e test', () => {

    let navBarPage: NavBarPage;
    let reservationDialogPage: ReservationDialogPage;
    let reservationComponentsPage: ReservationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reservations', () => {
        navBarPage.goToEntity('reservation-my-suffix');
        reservationComponentsPage = new ReservationComponentsPage();
        expect(reservationComponentsPage.getTitle())
            .toMatch(/jhipsterApp.reservation.home.title/);

    });

    it('should load create Reservation dialog', () => {
        reservationComponentsPage.clickOnCreateButton();
        reservationDialogPage = new ReservationDialogPage();
        expect(reservationDialogPage.getModalTitle())
            .toMatch(/jhipsterApp.reservation.home.createOrEditLabel/);
        reservationDialogPage.close();
    });

    it('should create and save Reservations', () => {
        reservationComponentsPage.clickOnCreateButton();
        reservationDialogPage.setStartDateInput(12310020012301);
        expect(reservationDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        reservationDialogPage.setFinishDateInput(12310020012301);
        expect(reservationDialogPage.getFinishDateInput()).toMatch('2001-12-31T02:30');
        reservationDialogPage.clientSelectLastOption();
        reservationDialogPage.roomSelectLastOption();
        reservationDialogPage.save();
        expect(reservationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReservationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-reservation-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReservationDialogPage {
    modalTitle = element(by.css('h4#myReservationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    startDateInput = element(by.css('input#field_startDate'));
    finishDateInput = element(by.css('input#field_finishDate'));
    clientSelect = element(by.css('select#field_client'));
    roomSelect = element(by.css('select#field_room'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    }

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    }

    setFinishDateInput = function(finishDate) {
        this.finishDateInput.sendKeys(finishDate);
    }

    getFinishDateInput = function() {
        return this.finishDateInput.getAttribute('value');
    }

    clientSelectLastOption = function() {
        this.clientSelect.all(by.tagName('option')).last().click();
    }

    clientSelectOption = function(option) {
        this.clientSelect.sendKeys(option);
    }

    getClientSelect = function() {
        return this.clientSelect;
    }

    getClientSelectedOption = function() {
        return this.clientSelect.element(by.css('option:checked')).getText();
    }

    roomSelectLastOption = function() {
        this.roomSelect.all(by.tagName('option')).last().click();
    }

    roomSelectOption = function(option) {
        this.roomSelect.sendKeys(option);
    }

    getRoomSelect = function() {
        return this.roomSelect;
    }

    getRoomSelectedOption = function() {
        return this.roomSelect.element(by.css('option:checked')).getText();
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
