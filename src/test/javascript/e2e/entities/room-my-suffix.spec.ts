import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Room e2e test', () => {

    let navBarPage: NavBarPage;
    let roomDialogPage: RoomDialogPage;
    let roomComponentsPage: RoomComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rooms', () => {
        navBarPage.goToEntity('room-my-suffix');
        roomComponentsPage = new RoomComponentsPage();
        expect(roomComponentsPage.getTitle())
            .toMatch(/jhipsterApp.room.home.title/);

    });

    it('should load create Room dialog', () => {
        roomComponentsPage.clickOnCreateButton();
        roomDialogPage = new RoomDialogPage();
        expect(roomDialogPage.getModalTitle())
            .toMatch(/jhipsterApp.room.home.createOrEditLabel/);
        roomDialogPage.close();
    });

    it('should create and save Rooms', () => {
        roomComponentsPage.clickOnCreateButton();
        roomDialogPage.setRoomNumberInput('5');
        expect(roomDialogPage.getRoomNumberInput()).toMatch('5');
        roomDialogPage.setNumberOfPersonsInput('5');
        expect(roomDialogPage.getNumberOfPersonsInput()).toMatch('5');
        roomDialogPage.setPriceInput('5');
        expect(roomDialogPage.getPriceInput()).toMatch('5');
        roomDialogPage.getStateInput().isSelected().then((selected) => {
            if (selected) {
                roomDialogPage.getStateInput().click();
                expect(roomDialogPage.getStateInput().isSelected()).toBeFalsy();
            } else {
                roomDialogPage.getStateInput().click();
                expect(roomDialogPage.getStateInput().isSelected()).toBeTruthy();
            }
        });
        roomDialogPage.setInventoryInput('inventory');
        expect(roomDialogPage.getInventoryInput()).toMatch('inventory');
        roomDialogPage.setRoomimg1Input(absolutePath);
        roomDialogPage.setRoomimg2Input(absolutePath);
        roomDialogPage.setRoomimg3Input(absolutePath);
        roomDialogPage.setRoomimg4Input(absolutePath);
        roomDialogPage.setRoomimg5Input(absolutePath);
        roomDialogPage.save();
        expect(roomDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RoomComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-room-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoomDialogPage {
    modalTitle = element(by.css('h4#myRoomLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    roomNumberInput = element(by.css('input#field_roomNumber'));
    numberOfPersonsInput = element(by.css('input#field_numberOfPersons'));
    priceInput = element(by.css('input#field_price'));
    stateInput = element(by.css('input#field_state'));
    inventoryInput = element(by.css('input#field_inventory'));
    roomimg1Input = element(by.css('input#file_roomimg1'));
    roomimg2Input = element(by.css('input#file_roomimg2'));
    roomimg3Input = element(by.css('input#file_roomimg3'));
    roomimg4Input = element(by.css('input#file_roomimg4'));
    roomimg5Input = element(by.css('input#file_roomimg5'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRoomNumberInput = function(roomNumber) {
        this.roomNumberInput.sendKeys(roomNumber);
    }

    getRoomNumberInput = function() {
        return this.roomNumberInput.getAttribute('value');
    }

    setNumberOfPersonsInput = function(numberOfPersons) {
        this.numberOfPersonsInput.sendKeys(numberOfPersons);
    }

    getNumberOfPersonsInput = function() {
        return this.numberOfPersonsInput.getAttribute('value');
    }

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    }

    getStateInput = function() {
        return this.stateInput;
    }
    setInventoryInput = function(inventory) {
        this.inventoryInput.sendKeys(inventory);
    }

    getInventoryInput = function() {
        return this.inventoryInput.getAttribute('value');
    }

    setRoomimg1Input = function(roomimg1) {
        this.roomimg1Input.sendKeys(roomimg1);
    }

    getRoomimg1Input = function() {
        return this.roomimg1Input.getAttribute('value');
    }

    setRoomimg2Input = function(roomimg2) {
        this.roomimg2Input.sendKeys(roomimg2);
    }

    getRoomimg2Input = function() {
        return this.roomimg2Input.getAttribute('value');
    }

    setRoomimg3Input = function(roomimg3) {
        this.roomimg3Input.sendKeys(roomimg3);
    }

    getRoomimg3Input = function() {
        return this.roomimg3Input.getAttribute('value');
    }

    setRoomimg4Input = function(roomimg4) {
        this.roomimg4Input.sendKeys(roomimg4);
    }

    getRoomimg4Input = function() {
        return this.roomimg4Input.getAttribute('value');
    }

    setRoomimg5Input = function(roomimg5) {
        this.roomimg5Input.sendKeys(roomimg5);
    }

    getRoomimg5Input = function() {
        return this.roomimg5Input.getAttribute('value');
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
