/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { MainPageDialogComponent } from '../../../../../../main/webapp/app/entities/main-page/main-page-dialog.component';
import { MainPageService } from '../../../../../../main/webapp/app/entities/main-page/main-page.service';
import { MainPage } from '../../../../../../main/webapp/app/entities/main-page/main-page.model';

describe('Component Tests', () => {

    describe('MainPage Management Dialog Component', () => {
        let comp: MainPageDialogComponent;
        let fixture: ComponentFixture<MainPageDialogComponent>;
        let service: MainPageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [MainPageDialogComponent],
                providers: [
                    MainPageService
                ]
            })
            .overrideTemplate(MainPageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MainPageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MainPageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MainPage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.mainPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mainPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MainPage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.mainPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mainPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
