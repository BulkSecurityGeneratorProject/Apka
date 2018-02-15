import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Photos e2e test', () => {

    let navBarPage: NavBarPage;
    let photosDialogPage: PhotosDialogPage;
    let photosComponentsPage: PhotosComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Photos', () => {
        navBarPage.goToEntity('photos-my-suffix');
        photosComponentsPage = new PhotosComponentsPage();
        expect(photosComponentsPage.getTitle())
            .toMatch(/jhipsterApp.photos.home.title/);

    });

    it('should load create Photos dialog', () => {
        photosComponentsPage.clickOnCreateButton();
        photosDialogPage = new PhotosDialogPage();
        expect(photosDialogPage.getModalTitle())
            .toMatch(/jhipsterApp.photos.home.createOrEditLabel/);
        photosDialogPage.close();
    });

    it('should create and save Photos', () => {
        photosComponentsPage.clickOnCreateButton();
        photosDialogPage.setRoomimg1Input(absolutePath);
        photosDialogPage.save();
        expect(photosDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PhotosComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-photos-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PhotosDialogPage {
    modalTitle = element(by.css('h4#myPhotosLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    roomimg1Input = element(by.css('input#file_roomimg1'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRoomimg1Input = function(roomimg1) {
        this.roomimg1Input.sendKeys(roomimg1);
    }

    getRoomimg1Input = function() {
        return this.roomimg1Input.getAttribute('value');
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
