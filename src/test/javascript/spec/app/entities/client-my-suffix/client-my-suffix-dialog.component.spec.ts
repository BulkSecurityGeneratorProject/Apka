/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { ClientMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix-dialog.component';
import { ClientMySuffixService } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix.service';
import { ClientMySuffix } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix.model';

describe('Component Tests', () => {

    describe('ClientMySuffix Management Dialog Component', () => {
        let comp: ClientMySuffixDialogComponent;
        let fixture: ComponentFixture<ClientMySuffixDialogComponent>;
        let service: ClientMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ClientMySuffixDialogComponent],
                providers: [
                    ClientMySuffixService
                ]
            })
            .overrideTemplate(ClientMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.client = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.client = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
