import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from "@angular/core";
import { UserRes } from "@modules/login/models/auth.model";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnChanges {
    @Input() user: UserRes;
    @Output() _logout$ = new EventEmitter<any>();
    constructor() { }

    ngOnChanges(simple: SimpleChanges) {
     }

    onLogout() {
        this._logout$.emit();
    }
}