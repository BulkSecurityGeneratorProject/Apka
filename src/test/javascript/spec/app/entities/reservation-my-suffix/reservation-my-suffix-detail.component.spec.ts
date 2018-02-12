/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { ReservationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix-detail.component';
import { ReservationMySuffixService } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix.service';
import { ReservationMySuffix } from '../../../../../../main/webapp/app/entities/reservation-my-suffix/reservation-my-suffix.model';

describe('Component Tests', () => {

    describe('ReservationMySuffix Management Detail Component', () => {
        let comp: ReservationMySuffixDetailComponent;
        let fixture: ComponentFixture<ReservationMySuffixDetailComponent>;
        let service: ReservationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ReservationMySuffixDetailComponent],
                providers: [
                    ReservationMySuffixService
                ]
            })
            .overrideTemplate(ReservationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReservationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ReservationMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reservation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
