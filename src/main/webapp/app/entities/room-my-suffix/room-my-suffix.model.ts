import { BaseEntity } from './../../shared';

export class RoomMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public roomNumber?: number,
        public numberOfPersons?: number,
        public price?: number,
        public state?: boolean,
        public inventory?: string,
        public reservations?: BaseEntity[],
        public photos?: BaseEntity[],
    ) {
        this.state = false;
    }
}
