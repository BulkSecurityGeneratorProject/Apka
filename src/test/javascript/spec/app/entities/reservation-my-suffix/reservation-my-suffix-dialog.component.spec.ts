/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { ReservationMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix-dialog.component';
import { ReservationMySuffixService } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix.service';
import { ReservationMySuffix } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix.model';
import { ClientMySuffixService } from '../../../../../../main/webapp/app/entities/client-my-suffix';
import { RoomMySuffixService } from '../../../../../../main/webapp/app/entities/room-my-suffix';

describe('Component Tests', () => {

    describe('ReservationMySuffix Management Dialog Component', () => {
        let comp: ReservationMySuffixDialogComponent;
        let fixture: ComponentFixture<ReservationMySuffixDialogComponent>;
        let service: ReservationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ReservationMySuffixDialogComponent],
                providers: [
                    ClientMySuffixService,
                    RoomMySuffixService,
                    ReservationMySuffixService
                ]
            })
            .overrideTemplate(ReservationMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReservationMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservationMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReservationMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.reservation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reservationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReservationMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.reservation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reservationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
