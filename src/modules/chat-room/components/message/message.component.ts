import { Component, Input } from "@angular/core";

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    @Input() text: string;
    @Input() displayName: string;
    @Input() createdAt: any;
    @Input() photoURL: string;
    
    constructor() { }
}