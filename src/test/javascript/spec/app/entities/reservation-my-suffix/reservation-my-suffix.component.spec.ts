/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { ReservationMySuffixComponent } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix.component';
import { ReservationMySuffixService } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix.service';
import { ReservationMySuffix } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix.model';

describe('Component Tests', () => {

    describe('ReservationMySuffix Management Component', () => {
        let comp: ReservationMySuffixComponent;
        let fixture: ComponentFixture<ReservationMySuffixComponent>;
        let service: ReservationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ReservationMySuffixComponent],
                providers: [
                    ReservationMySuffixService
                ]
            })
            .overrideTemplate(ReservationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReservationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ReservationMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reservations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
