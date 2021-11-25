import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NzFilterOptionType } from "ng-zorro-antd/select";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'modal-invite-member',
    templateUrl: './invite-member.component.html',
    styleUrls: ['./invite-member.component.scss']
})
export class ModalInviteMemberComponent {
    @Input() users: any;
    @Output() _cancellation$ = new EventEmitter<any>();
    @Output() _submission$ = new EventEmitter<any>();
    nzFilterOption = (): boolean => false;
    form: FormGroup;
    debounceSearch = new Subject<any>();

    constructor(
        private _fb: FormBuilder
    ) {
        this.form = this._fb.group({
            tags: [[]]
        });
        this.debounceSearch
            .pipe(debounceTime(300))
            .subscribe((value) => this._submission$.emit(value));
    }

    handleOk() {
        const rawValue = {
            ...this.form.getRawValue() as any,
            command: 'submit'
        };

        this._submission$.emit(rawValue);
    }

    handleCancel() {
        this._cancellation$.emit();
    }

    onSearch(txtSearch: string) {
        const value = {
            value: txtSearch,
            command: 'searching'
        }
        this.debounceSearch.next(value);
    }
}