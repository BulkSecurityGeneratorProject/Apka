import { BaseEntity } from './../../shared';

export class ReservationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public finishDate?: any,
        public clientId?: number,
        public roomId?: number,
    ) {
    }
}
