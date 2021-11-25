import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
    @Input() rooms: any;
    @Output() _submission$ = new EventEmitter<any>();
    show = false;

    constructor() { }

    showModal() {
        this.show = true;
    }

    handleCancel() {
        this.show = false;
    }

    handleSubmit(event: any) {        
        this.show = false;
        if(!event) return;
        const data = {
            data: event,
            command: 'addRoom'
        };
        this._submission$.emit(data);
    }

    selectedRoomId(id: string) {
        const data = {
            id: id,
            command: 'selectedRoom'
        };
        this._submission$.emit(data);
    }
}