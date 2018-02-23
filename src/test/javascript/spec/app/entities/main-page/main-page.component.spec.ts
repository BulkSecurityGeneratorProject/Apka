/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { MainPageComponent } from '../../../../../../main/webapp/app/entities/main-page/main-page.component';
import { MainPageService } from '../../../../../../main/webapp/app/entities/main-page/main-page.service';
import { MainPage } from '../../../../../../main/webapp/app/entities/main-page/main-page.model';

describe('Component Tests', () => {

    describe('MainPage Management Component', () => {
        let comp: MainPageComponent;
        let fixture: ComponentFixture<MainPageComponent>;
        let service: MainPageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [MainPageComponent],
                providers: [
                    MainPageService
                ]
            })
            .overrideTemplate(MainPageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MainPageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MainPageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MainPage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mainPages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
