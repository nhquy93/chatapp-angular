import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ChatRoomService {
    readonly _rooms$ = new BehaviorSubject<any>(null);
    readonly _room$ = new BehaviorSubject<any>(null);
    readonly _members$ = new BehaviorSubject<any>(null);
    readonly _messages$ = new Subject<any>();
    readonly _userList$ = new BehaviorSubject<any>(null);

    constructor(
        private _fs: AngularFirestore
    ) { }

    /** SIDEBAR */
    getRooms(uid: string) {
        const condition = {
            fieldPath: 'members',
            operator: 'array-contains',
            compareValue: uid
        };

        this._fs.collection('rooms', ref => ref.orderBy('createdAt').where(condition.fieldPath, condition.operator as any, condition.compareValue)).snapshotChanges()
            .pipe(
                map(actions => actions.map(act => {
                    const data = act.payload.doc.data() as {};
                    const id = act.payload.doc.id;
                    return { ...data, id };
                }))
            )
            .subscribe((payload) => {
                this._rooms$.next(payload);
            });
    }

    addRoom(data: any) {
        this._fs.collection('rooms').add({
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    /** ************************* */

    /** CHAT-WINDOW */
    getRoomById(id: string) {
        this._fs.collection('rooms').doc(id).snapshotChanges()
            .pipe(
                map(actions => {
                    const data = actions.payload.data() as {};
                    const id = actions.payload.id;
                    return { ...data, id };
                }))
            .subscribe((payload) => {
                this._room$.next(payload);
            });
    }

    getMembers(selectedRoom: any) {
        const condition = {
            fieldPath: 'uid',
            operator: 'in',
            compareValue: selectedRoom?.members
        };
        this._fs.collection('users', ref => ref.orderBy('createdAt').where(condition.fieldPath, condition.operator as any, condition.compareValue)).snapshotChanges()
            .pipe(
                map(actions => actions.map(act => {
                    const data = act.payload.doc.data() as {};
                    const id = act.payload.doc.id;
                    return { ...data, id };
                }))
            )
            .subscribe((payload) => {
                this._members$.next(payload);
            });
    }

    addMessage(msg: any) {
        this._fs.collection('messages').add({
            ...msg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    fetchMessages(selectedRoom: any) {
        const condition = {
            fieldPath: 'roomId',
            operator: '==',
            compareValue: selectedRoom?.id
        };
        this._fs.collection('messages', ref => ref.orderBy('createdAt', 'asc').where(condition.fieldPath, condition.operator as any, condition.compareValue)).snapshotChanges()
            .pipe(
                map(actions => actions.map(act => {
                    const data = act.payload.doc.data() as {};
                    const id = act.payload.doc.id;
                    return { ...data, id };
                })),
                map(msgs => msgs.map((msg: any) => {
                    return {
                        ...msg,
                        createdAt: msg.createdAt?.seconds*1000
                    }
                }))
            )
            .subscribe((payload) => {
                this._messages$.next(payload);
            });
    }

    fetchUserList(search: string, curMembers: string[]) {
        let documents;
        if (!search) {
            documents = this._fs.collection('users', ref => ref.orderBy('displayName').limit(20)).get();
        } else {
            documents = this._fs.collection('users', ref => ref.where('keywords', 'array-contains', search).orderBy('displayName').limit(20)).get();
        }
        documents.subscribe((snapshot) => {
            let users = snapshot.docs.map((doc) => {
                const data = doc.data() as any;
                return {
                    label: data?.displayName,
                    value: data?.uid,
                    photoURL: data?.photoURL
                }
            }).filter(m => !curMembers.includes(m.value));
            this._userList$.next(users);
        });
    }

    updateUserInRoom(selectedRoom: any, uids: string[]) {
        this._fs.collection('rooms').doc(selectedRoom?.id).update({
            members: [...selectedRoom.members, ...uids]
        })
    }
    /** ******************************** */
}