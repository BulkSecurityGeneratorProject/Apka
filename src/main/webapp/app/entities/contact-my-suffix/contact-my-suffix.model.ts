import { BaseEntity } from './../../shared';

export class ContactMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public localName?: string,
        public phoneNumber?: number,
        public emailAdress?: string,
        public adress?: string,
    ) {
    }
}
