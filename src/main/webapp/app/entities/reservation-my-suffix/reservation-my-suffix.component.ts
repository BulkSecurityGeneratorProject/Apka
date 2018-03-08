import { Component, OnInit, OnDestroy,  ChangeDetectionStrategy,ViewChild,TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { ReservationMySuffix } from './reservation-my-suffix.model';
import { ReservationMySuffixService } from './reservation-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent} from 'angular-calendar';

import { ClientMySuffix, ClientMySuffixService } from '../client-my-suffix';
import { RoomMySuffix, RoomMySuffixService } from '../room-my-suffix';
import { DatePipe } from '@angular/common';

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
    selector: 'jhi-reservation-my-suffix',
    templateUrl: './reservation-my-suffix.component.html'
})
export class ReservationMySuffixComponent implements OnInit, OnDestroy {
reservations: ReservationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    clients: ClientMySuffix[];

    rooms: RoomMySuffix[];

    wasCalled = 0;
    howManyRes = 0;
    howManyResTest = 0;
    howManyTest = 0;
    roomOccupiedTest = [];
    roomOccupiedTest2 = [1,2];
    roomsNumbers = [];
    varPom = 0;
    chosenRoom = 71;
    roomsLength = 0;

    roomOccupiedArray = [this.roomOccupiedTest, this.roomOccupiedTest2, this.roomOccupiedTest];

    constructor(
        private reservationService: ReservationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private clientService: ClientMySuffixService,
        private roomService: RoomMySuffixService,
        private eventManager: JhiEventManager,
        private modal: NgbModal,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.reservationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.reservations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.clientService.query()
            .subscribe((res: ResponseWrapper) => { this.clients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.roomService.query()
            .subscribe((res: ResponseWrapper) => { this.rooms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReservations();

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReservationMySuffix) {
        return item.id;
    }
    registerChangeInReservations() {
        this.eventSubscriber = this.eventManager.subscribe('reservationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    convertFromID(tableEntity, resID){
        for(var i = 0; tableEntity.length > i; i++){
            if(tableEntity[i].id == resID){
                if(tableEntity == this.rooms){
                    return tableEntity[i].roomNumber;
                }
                else{
                    return (tableEntity[i].name+" "+tableEntity[i].surname);
                }
            }
        }
    }

    getDaysBetween(startDate, finishDate){
        let Napis="";
        let numberOfDays = (finishDate - startDate)/86400000;
        let daysBetween = [];

        this.getRoomsNumber();
        for(let i = 0; i < (numberOfDays-1); i++){
            daysBetween[daysBetween.length] = new Date((startDate-0) + (i+1)*86400000);
            Napis += daysBetween[i];
        }
        return daysBetween;
    }

    addRooomToOccupiedTable(dateOccupied){
        for (let i = 0;  i < (this.roomOccupiedArray[2].length-1); i++){
            if(this.roomOccupiedArray[2][i] === dateOccupied){
                return "Bylo";
            }
        }
        this.roomOccupiedArray[2][this.roomOccupiedArray[2].length] = dateOccupied;
    }


    awsomeFunction(){
        if (this.wasCalled == 0){
            return true;
        }
        else{
            return false;
        }
    }

    setWasCalled(){
        if( this.varPom == 0){
            this.countRooms();
            this.varPom = 1;
        }
        if( this.howManyRes == 1 ){
            this.wasCalled = 1;
        }
        else{
            this.howManyRes -= 1;
        }
    }

    countRooms(){
        if(this.reservations && this.varPom == 0){
            this.howManyTest = this.reservations.length;
            for( let i = 0; i < this.reservations.length; i++){
                if(this.reservations[i].roomId == this.chosenRoom){
                    this.howManyRes += 1;
                }
            }
            this.varPom = 1;
        }
    }

    test(){
        this.chosenRoom = 71;
        this.varPom = 0;
        this.howManyRes = 0;
        this.wasCalled = 0;
    }

    getRoomsNumber(){
        if(this.rooms){
            this.roomsLength = this.rooms.length;
        }
        for(let i = 1; i < (this.roomsLength - 1); i++){
            this.roomOccupiedArray[i] = this.roomOccupiedTest;
        }
    }

    changeRoom(roomN){
        this.chosenRoom = roomN;
        this.varPom = 0;
        this.howManyRes = 0;
        this.wasCalled = 0;
        this.roomOccupiedArray[2].length = 0;
    }

    getRealId(reservationID){

            for( let i = 0; i < this.reservations.length; i++){
                if(reservationID == this.reservations[i].id){
                    return (i+1);
                }
            }
            return 99;
    }


          @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();
    zmTest = "TEST";

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

    testfunctionCalendar(){
        this.zmTest = "dsadad";
    }
}
