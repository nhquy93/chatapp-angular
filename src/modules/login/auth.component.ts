import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "./services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoading = false;
    private sub: Subscription;

    constructor(
        private _auth: AuthService
    ) { }

    ngOnInit(): void {
        this.sub = this._auth._loading$.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    GoogleProvider() {
        this._auth.GoogleAuthentication();
    }
}