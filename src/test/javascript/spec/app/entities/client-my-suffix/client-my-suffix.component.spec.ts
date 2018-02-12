/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { ClientMySuffixComponent } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix.component';
import { ClientMySuffixService } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix.service';
import { ClientMySuffix } from '../../../../../../main/webapp/app/entities/client-my-suffix/client-my-suffix.model';

describe('Component Tests', () => {

    describe('ClientMySuffix Management Component', () => {
        let comp: ClientMySuffixComponent;
        let fixture: ComponentFixture<ClientMySuffixComponent>;
        let service: ClientMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ClientMySuffixComponent],
                providers: [
                    ClientMySuffixService
                ]
            })
            .overrideTemplate(ClientMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ClientMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clients[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
