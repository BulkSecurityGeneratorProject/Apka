import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ReservationMySuffix } from './reservation-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReservationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/reservations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(reservation: ReservationMySuffix): Observable<ReservationMySuffix> {
        const copy = this.convert(reservation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(reservation: ReservationMySuffix): Observable<ReservationMySuffix> {
        const copy = this.convert(reservation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ReservationMySuffix> {
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
     * Convert a returned JSON object to ReservationMySuffix.
     */
    private convertItemFromServer(json: any): ReservationMySuffix {
        const entity: ReservationMySuffix = Object.assign(new ReservationMySuffix(), json);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        entity.finishDate = this.dateUtils
            .convertDateTimeFromServer(json.finishDate);
        return entity;
    }

    /**
     * Convert a ReservationMySuffix to a JSON which can be sent to the server.
     */
    private convert(reservation: ReservationMySuffix): ReservationMySuffix {
        const copy: ReservationMySuffix = Object.assign({}, reservation);

        copy.startDate = this.dateUtils.toDate(reservation.startDate);

        copy.finishDate = this.dateUtils.toDate(reservation.finishDate);
        return copy;
    }
}
