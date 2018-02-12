/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { ClientMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix-detail.component';
import { ClientMySuffixService } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix.service';
import { ClientMySuffix } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix.model';

describe('Component Tests', () => {

    describe('ClientMySuffix Management Detail Component', () => {
        let comp: ClientMySuffixDetailComponent;
        let fixture: ComponentFixture<ClientMySuffixDetailComponent>;
        let service: ClientMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ClientMySuffixDetailComponent],
                providers: [
                    ClientMySuffixService
                ]
            })
            .overrideTemplate(ClientMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ClientMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.client).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
