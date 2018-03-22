import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReservationMySuffix } from './reservation-my-suffix.model';
import { ReservationMySuffixPopupService } from './reservation-my-suffix-popup.service';
import { ReservationMySuffixService } from './reservation-my-suffix.service';
import { ClientMySuffix, ClientMySuffixService } from '../client-my-suffix';
import { RoomMySuffix, RoomMySuffixService } from '../room-my-suffix';
import { ResponseWrapper } from '../../shared';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent} from 'angular-calendar';

const colors: any = {
red: {
primary: '#ad2121',
secondary: '#FAE3E3'
},
blue: {
primary: '#1e90ff',
secondary: '#D1E8FF'
},
yellow: {
primary: '#e3bc08',
secondary: '#FDF1BA'
}
};
@Component({
    selector: 'jhi-reservation-my-suffix-dialog',
    templateUrl: './reservation-my-suffix-dialog.component.html'
})
export class ReservationMySuffixDialogComponent implements OnInit {

    reservation: ReservationMySuffix;
    isSaving: boolean;

    rooms: RoomMySuffix[];

    clients: ClientMySuffix[];

    reservations: ReservationMySuffix[];

    infoArray = ['', ''];
    pom = 1;
    disableButton = 1;
    inputCheck = [ 0, 0];
    pomString = "";
    startDateString = "";
    finishDateString = "";
    pomArr = [];
    roomsOccupiedArray = [[],[]];
    roomsNumberArr = [];
    roomsOccupiedDateArr = [[],[],[],[],[],[],[],[],[],[],[],[]];
    dateTocheck = new Date();
    dateTocheckFinish = new Date();
    checkResult = [];

    roomsLength = 0;
    reservationsLength = 0;
    done = 0;

    isTyping = [true, true, true, true];
    Typing(i,logic){
        this.isTyping[i] = logic;
    }


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reservationService: ReservationMySuffixService,
        private clientService: ClientMySuffixService,
        private roomService: RoomMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: ResponseWrapper) => { this.clients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.roomService.query()
            .subscribe((res: ResponseWrapper) => { this.rooms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.reservationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.reservations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    getFreeRooms(startDateToCheck, finishDateToCheck){

        this.roomsLength = this.rooms.length;
        for(let i = 0; i < this.roomsLength; i++){
            this.roomsNumberArr[i] = this.rooms[i].id;
            this.checkResult[i] = true;
        }

        this.reservationsLength = this.reservations.length;
        if(this.done == 0 ){
           for(let i = 0; i < this.reservationsLength; i++){
                for(let j = 0; j < this.roomsLength; j++){
                    if( this.reservations[i].roomId ==  this.rooms[j].id){
                        this.roomsOccupiedDateArr[j][this.roomsOccupiedDateArr[j].length] = this.reservations[i].startDate;
                        this.roomsOccupiedDateArr[j][this.roomsOccupiedDateArr[j].length] = this.reservations[i].finishDate;
                    }
                }
           }
        }
        this.done = 1;
        this.dateTocheck = new Date(startDateToCheck);
        this.dateTocheckFinish = new Date(finishDateToCheck);
        for(let k = 0; k < this.roomsLength; k++){
            for(let i = 0; i < this.roomsOccupiedDateArr[k].length; i += 2){
                if( this.dateTocheckFinish < this.roomsOccupiedDateArr[k][i] || this.dateTocheck > this.roomsOccupiedDateArr[k][i+1]){
                    this.checkResult[k] = true;
                }
                else{
                    this.checkResult[k] = false;
                    break;
                }
            }
        }
    }

    getRealRoomId(id){
        for(let i = 0; i < this.roomsLength; i++){
            if(this.rooms[i].id == id){
                return i;
            }
        }
        return -1;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reservation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reservationService.update(this.reservation));
        } else {
            this.subscribeToSaveResponse(
                this.reservationService.create(this.reservation));
        }
    }

    private subscribeToSaveResponse(result: Observable<ReservationMySuffix>) {
        result.subscribe((res: ReservationMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ReservationMySuffix) {
        this.eventManager.broadcast({ name: 'reservationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: ClientMySuffix) {
        return item.id;
    }

    trackRoomById(index: number, item: RoomMySuffix) {
        return item.id;
    }

    ValidateFunction(i) {
        this.Typing(i,false);
        switch(i){
            case 0:
                this.pom = this.reservation.startDate;
                break;
            case 1:
                this.pom = this.reservation.finishDate;
                break;
        }
        if (this.pom){
            this.infoArray[i] = '';
            this.inputCheck[i] = 1;
            if ((i === 1 || i ===0) && this.inputCheck[0] && this.inputCheck[1]) {
                this.finishDateString = '';
                this.startDateString = '';
                this.pomString = this.reservation.startDate.toString();
                for( var j = 0; j < 10 ; j++){
                    this.startDateString += this.pomString[j];
                }
                this.pomString = this.reservation.finishDate.toString();
                for( var j = 0; j < 10 ; j++){
                    this.finishDateString += this.pomString[j];
                }
                for ( var j = 0; j < this.finishDateString.length; j++){
                    if( this.startDateString[j] !== this.finishDateString[j]){
                        if (this.startDateString[j] >= this.finishDateString[j]){
                            this.inputCheck[4] = 0;
                            this.infoArray[i] = 'Finish date must be later then start date';
                        }
                        else{
                            this.inputCheck[4] = 1;
                            this.infoArray[0] = '';
                            this.infoArray[1] = '';
                        }
                        break;
                    }
                }
            }
        }
        if(this.inputCheck[0] && this.inputCheck[1]){
            this.disableButton = 0;
        }
        else{
            this.disableButton = 1;
        }
    }

    getColor(i){
        if ( this.infoArray[i] !== ''){
            return 'red';
        }
        else{
            return '#D4D5D6';
        }
    }

}

@Component({
    selector: 'jhi-reservation-my-suffix-popup',
    template: ''
})
export class ReservationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reservationPopupService: ReservationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reservationPopupService
                    .open(ReservationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.reservationPopupService
                    .open(ReservationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
