import { BaseEntity } from './../../shared';

export class ClientMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public phoneNumber?: number,
        public emailAdress?: string,
        public reservations?: BaseEntity[],
    ) {
    }
}
