import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ChatRoomService } from "@modules/chat-room/services/chat-room.service";
import { AuthService } from "@modules/login/services/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
    @Input() room: any;
    @Input() members: any;
    @Input() users: any;
    @Output() _submission$ = new EventEmitter<any>();

    private subs: Subscription[];
    messages: any[] = [];
    show = false;
    message: string;
    curUser: any;
    createdAt: Date;

    constructor(
        private _auth: AuthService,
        private _cr: ChatRoomService
    ) { }

    ngOnInit(): void {
        this.subs = [
            this._auth._user$.subscribe(user => {
                if (!user) return;
                this.curUser = user;
            }),
            this._cr._messages$
            .subscribe(messages => {
                this.messages = messages;
            })
        ];
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    handleModal() {
        this.show = true;
    }

    handleCancel() {
        this.show = false;
    }

    handleSubmit(event: any) {
        switch (event?.command) {
            case 'submit':
                this._submission$.emit(event.tags);
                this.show = false;
                break;
            case 'searching':
                this._cr.fetchUserList(event.value, this.room.members);
                break;
            default:
                this.show = false;
                return;
        }
    }

    handleSend() {
        if(!this.message) return;

        let msg = {
            roomId: this.room.id,
            uid: this.curUser.uid,
            text: this.message,
            photoURL: this.curUser.photoURL,
            displayName: this.curUser.displayName
        };

        this._cr.addMessage(msg);
        this.message = '';
    }
}