/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { PhotosMySuffixComponent } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix.component';
import { PhotosMySuffixService } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix.service';
import { PhotosMySuffix } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix.model';

describe('Component Tests', () => {

    describe('PhotosMySuffix Management Component', () => {
        let comp: PhotosMySuffixComponent;
        let fixture: ComponentFixture<PhotosMySuffixComponent>;
        let service: PhotosMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PhotosMySuffixComponent],
                providers: [
                    PhotosMySuffixService
                ]
            })
            .overrideTemplate(PhotosMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotosMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotosMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PhotosMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.photos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
