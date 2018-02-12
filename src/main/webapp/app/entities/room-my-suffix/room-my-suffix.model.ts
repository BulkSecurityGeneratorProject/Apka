import { BaseEntity } from './../../shared';

export class RoomMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public roomNumber?: number,
        public numberOfPersons?: number,
        public price?: number,
        public state?: boolean,
        public inventory?: string,
        public roomimg1ContentType?: string,
        public roomimg1?: any,
        public roomimg2ContentType?: string,
        public roomimg2?: any,
        public roomimg3ContentType?: string,
        public roomimg3?: any,
        public roomimg4ContentType?: string,
        public roomimg4?: any,
        public roomimg5ContentType?: string,
        public roomimg5?: any,
        public reservations?: BaseEntity[],
    ) {
        this.state = false;
    }
}
