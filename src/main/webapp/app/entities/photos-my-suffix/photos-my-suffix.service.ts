import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PhotosMySuffix } from './photos-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PhotosMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/photos';

    constructor(private http: Http) { }

    create(photos: PhotosMySuffix): Observable<PhotosMySuffix> {
        const copy = this.convert(photos);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(photos: PhotosMySuffix): Observable<PhotosMySuffix> {
        const copy = this.convert(photos);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PhotosMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to PhotosMySuffix.
     */
    private convertItemFromServer(json: any): PhotosMySuffix {
        const entity: PhotosMySuffix = Object.assign(new PhotosMySuffix(), json);
        return entity;
    }

    /**
     * Convert a PhotosMySuffix to a JSON which can be sent to the server.
     */
    private convert(photos: PhotosMySuffix): PhotosMySuffix {
        const copy: PhotosMySuffix = Object.assign({}, photos);
        return copy;
    }
}
