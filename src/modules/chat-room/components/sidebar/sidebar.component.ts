import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ChatRoomService } from "@modules/chat-room/services/chat-room.service";
import { UserRes } from "@modules/login/models/auth.model";
import { AuthService } from "@modules/login/services/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
    @Output() _selection$ = new EventEmitter<any>();
    private subs: Subscription[];
    user: UserRes;
    rooms: any[] = [];

    constructor(
        private _auth: AuthService,
        private _cr: ChatRoomService
    ) { }

    ngOnInit(): void {
        this.subs = [
            this._auth._user$.subscribe(user => {
                if (!user) return;
                this.user = user;
                this._cr.getRooms(user?.uid);
            }),
            this._cr._rooms$.subscribe(rooms => {
                if(!rooms) return;
                this.rooms = rooms;
            })
        ]
    }

    handleLogout(event: any) {
        this._auth.Logout();
    }

    handleSubmit(event: any) {
        switch (event?.command) {
            case 'addRoom':
                const data = {
                    ...event?.data,
                    members: [this.user?.uid]
                };
                this._cr.addRoom(data);
                break;
            case 'selectedRoom':
                this._selection$.emit(event.id);
                break;
            default: return;
        }
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}