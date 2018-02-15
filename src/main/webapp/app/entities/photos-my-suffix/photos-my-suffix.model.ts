import { BaseEntity } from './../../shared';

export class PhotosMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public roomimg1ContentType?: string,
        public roomimg1?: any,
        public rooms?: BaseEntity[],
    ) {
    }
}
