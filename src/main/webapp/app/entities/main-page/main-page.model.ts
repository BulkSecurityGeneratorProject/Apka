import { BaseEntity } from './../../shared';

export class MainPage implements BaseEntity {
    constructor(
        public id?: number,
        public homePageImgContentType?: string,
        public homePageImg?: any,
        public homepageText?: string,
    ) {
    }
}
