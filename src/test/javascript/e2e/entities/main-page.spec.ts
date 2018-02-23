import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('MainPage e2e test', () => {

    let navBarPage: NavBarPage;
    let mainPageDialogPage: MainPageDialogPage;
    let mainPageComponentsPage: MainPageComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MainPages', () => {
        navBarPage.goToEntity('main-page');
        mainPageComponentsPage = new MainPageComponentsPage();
        expect(mainPageComponentsPage.getTitle())
            .toMatch(/jhipsterApp.mainPage.home.title/);

    });

    it('should load create MainPage dialog', () => {
        mainPageComponentsPage.clickOnCreateButton();
        mainPageDialogPage = new MainPageDialogPage();
        expect(mainPageDialogPage.getModalTitle())
            .toMatch(/jhipsterApp.mainPage.home.createOrEditLabel/);
        mainPageDialogPage.close();
    });

    it('should create and save MainPages', () => {
        mainPageComponentsPage.clickOnCreateButton();
        mainPageDialogPage.setHomePageImgInput(absolutePath);
        mainPageDialogPage.setHomepageTextInput('homepageText');
        expect(mainPageDialogPage.getHomepageTextInput()).toMatch('homepageText');
        mainPageDialogPage.save();
        expect(mainPageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MainPageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-main-page div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MainPageDialogPage {
    modalTitle = element(by.css('h4#myMainPageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    homePageImgInput = element(by.css('input#file_homePageImg'));
    homepageTextInput = element(by.css('input#field_homepageText'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setHomePageImgInput = function(homePageImg) {
        this.homePageImgInput.sendKeys(homePageImg);
    }

    getHomePageImgInput = function() {
        return this.homePageImgInput.getAttribute('value');
    }

    setHomepageTextInput = function(homepageText) {
        this.homepageTextInput.sendKeys(homepageText);
    }

    getHomepageTextInput = function() {
        return this.homepageTextInput.getAttribute('value');
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
