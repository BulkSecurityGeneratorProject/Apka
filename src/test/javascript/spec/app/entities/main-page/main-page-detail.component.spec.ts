/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { MainPageDetailComponent } from '../../../../../../main/webapp/app/entities/main-page/main-page-detail.component';
import { MainPageService } from '../../../../../../main/webapp/app/entities/main-page/main-page.service';
import { MainPage } from '../../../../../../main/webapp/app/entities/main-page/main-page.model';

describe('Component Tests', () => {

    describe('MainPage Management Detail Component', () => {
        let comp: MainPageDetailComponent;
        let fixture: ComponentFixture<MainPageDetailComponent>;
        let service: MainPageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [MainPageDetailComponent],
                providers: [
                    MainPageService
                ]
            })
            .overrideTemplate(MainPageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MainPageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MainPageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MainPage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mainPage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
