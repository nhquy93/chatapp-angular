import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'modal-add-room',
    templateUrl: './add-room.component.html',
    styleUrls: ['./add-room.component.scss']
})
export class ModalAddRoomComponent {
    @Output() _cancellation$ = new EventEmitter<any>();
    @Output() _submission$ = new EventEmitter<any>();
    form: FormGroup;

    constructor(
        private _fb: FormBuilder
    ) {
        this.form = this._fb.group({
            name: [null, [Validators.required, Validators.maxLength(100)]],
            desc: [null]
        })
    }

    handleOk() {
        if (this.form.invalid) {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }
        const rawValue = this.form.getRawValue() as any;
        Object.keys(rawValue).forEach(key => {
            rawValue[key] = typeof rawValue[key] == 'string' ? rawValue[key].trim() : rawValue[key];
        });
        this._submission$.emit(rawValue);
    }

    handleCancel() {
        this._cancellation$.emit();
    }
}