/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { PhotosMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix-detail.component';
import { PhotosMySuffixService } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix.service';
import { PhotosMySuffix } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix.model';

describe('Component Tests', () => {

    describe('PhotosMySuffix Management Detail Component', () => {
        let comp: PhotosMySuffixDetailComponent;
        let fixture: ComponentFixture<PhotosMySuffixDetailComponent>;
        let service: PhotosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PhotosMySuffixDetailComponent],
                providers: [
                    PhotosMySuffixService
                ]
            })
            .overrideTemplate(PhotosMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotosMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PhotosMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.photos).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
