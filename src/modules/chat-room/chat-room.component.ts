import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ChatRoomService } from "./services/chat-room.service";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
    private subs: Subscription[];
    selectedRoom: any;
    members: any;
    users: any;

    constructor(
        private _cr: ChatRoomService
    ) { }

    ngOnInit(): void {
        this.subs = [
            this._cr._room$.subscribe(room => {
                if(!room) return;
                this.selectedRoom = room;
                this._cr.fetchMessages(this.selectedRoom);
                this._cr.getMembers(room);
            }),
            this._cr._members$.subscribe(members => {
                if(!members) return;
                this.members = members;
            }),
            this._cr._userList$.subscribe(users => {
                if(!users) return;
                this.users = users;
            })
        ];
    }

    handleRoomId(event: string) {
        this._cr.getRoomById(event);
    }

    handleTags(event: string[]) {
        this._cr.updateUserInRoom(this.selectedRoom, event);
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}