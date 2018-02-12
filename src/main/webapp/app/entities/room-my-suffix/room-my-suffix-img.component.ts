import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomMySuffix } from './room-my-suffix.model';
import { RoomMySuffixPopupService } from './room-my-suffix-popup.service';
import { RoomMySuffixService } from './room-my-suffix.service';
import {trigger, state, style, animate, keyframes, transition} from '@angular/animations';


@Component({
    selector: 'jhi-room-my-suffix-img',
    templateUrl: './room-my-suffix-img.component.html',
    animations: [
      trigger('imgAnimation', [
        state('inactive', style({
        })),
        state('active',   style({
        })),
        transition('inactive => active', [
            animate(800, keyframes([
                style({opacity: 1, offset: 0}),
                style({opacity: 0.2, offset: 0.8}),
                style({opacity: 0, offset: 1.0})
            ]))
        ]),
        transition('active => inactive', [
            animate(800, keyframes([
                style({opacity: 0, offset: 0}),
                style({opacity: 0.2, offset: 0.3}),
                style({opacity: 1, offset: 1.0})
            ]))
        ]),
      ])
    ]
})
export class RoomMySuffixImgComponent {

    room: RoomMySuffix;
    currentImg = 0;
    imgAmount = 0;
    state = 'inactive';
    animationEvent;
    direction = 'next';

    animateTransition(dir) {
        this.state = this.state === 'active' ? 'inactive' : 'active';
        this.direction = dir;
    }

    countImg(){
        if(this.room.roomimg1){
            this.imgAmount += 1;
        }
        if(this.room.roomimg2){
            this.imgAmount += 1;
        }
        if(this.room.roomimg3){
            this.imgAmount += 1;
        }
        if(this.room.roomimg4){
            this.imgAmount += 1;
        }
        if(this.room.roomimg5){
            this.imgAmount += 1;
        }
    }

    test(event){
        this.animationEvent = event.toState;
        if(event.toState == 'active'){
            if(this.direction == 'next'){
                if(this.currentImg < 4){
                    this.currentImg = this.currentImg + 1;
                }
            }
            else{
                if(this.currentImg > 0){
                    this.currentImg = this.currentImg - 1;
                }
            }
        }
        this.state = 'inactive';
    }

    ngOnInit(){
        this.countImg();
        this.state = 'inactive';
    }

    constructor(
        private roomService: RoomMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roomListModification',
                content: 'Deleted an room'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-room-my-suffix-img-popup',
    template: ''
})
export class RoomMySuffixImgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomPopupService
                .open(RoomMySuffixImgComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
