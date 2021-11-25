import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { UserRes, UserReq } from "../models/auth.model";
import { generateKeywords } from '@shared/firebase-helper.util';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly _user$ = new BehaviorSubject<UserRes|null>(null);
    readonly _loading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router,
        private _fs: AngularFirestore,
        private _afAuth: AngularFireAuth,
    ) { }

    GoogleAuthentication() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this._loading$.next(true);
        return this.oAuthLogin(provider)
            .then((authRes) => {
                const { additionalUserInfo, user } = authRes;
                if (additionalUserInfo?.isNewUser) {
                    const data = new UserReq({
                        displayName: user?.displayName,
                        email: user?.email,
                        uid: user?.uid,
                        photoURL: user?.photoURL,
                        providerId: additionalUserInfo?.providerId
                    });
                    this._fs.collection('users').add({
                        ...data,
                        keywords: generateKeywords(data.displayName),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }

                const { credential } = authRes as any;
                const userRes = {
                    uid: user?.uid,
                    displayName: user?.displayName,
                    accessToken: credential?.accessToken,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    providerId: user?.providerId
                } as UserRes;

                this.handleAuthentication(userRes);
            })
            .catch((err) => {
                console.log('Error: ', err);
                const errorCode = err.code;
                const errorMessage = err.message;
                const email = err.email;
                this._loading$.next(false);
                throw err;
            });
    }

    Logout() {
        this._afAuth.signOut().then(() => {
            this._user$.next(null);
            localStorage.removeItem('CurrentUser');
            this.router.navigate(['/']);
        })
    }

    currentUser() {
        let curUser = localStorage.getItem('CurrentUser');
        if(!curUser) return;
        this.handleAuthentication(<UserRes>(JSON.parse(curUser)));
    }

    private oAuthLogin(provider) {
        return this._afAuth.signInWithPopup(provider);
    }

    private handleAuthentication(user: UserRes) {
        this._user$.next(user);
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        this._loading$.next(false);
        this.router.navigate(['/chat-room']);
    }
}