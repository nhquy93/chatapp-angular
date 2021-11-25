import { generateKeywords } from "@shared/firebase-helper.util";

export interface AuthRes {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export class UserRes {
    accessToken: string;
    displayName: string;
    email: string;
    providerId: string;
    photoURL: string;
    uid?

    constructor(defaultValue: Partial<UserRes> = {}) {
        this.accessToken = defaultValue?.accessToken || '';
        this.displayName = defaultValue?.displayName || '';
        this.email = defaultValue?.email || '';
        this.providerId = defaultValue?.providerId || '';
        this.photoURL = defaultValue?.photoURL || '';
    }
}

export class UserReq {
    displayName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
    uid: string | null | undefined;
    providerId: string | null | undefined;

    constructor(defaultValue: Partial<UserReq> = {}) {
        this.displayName = defaultValue?.displayName || '';
        this.email = defaultValue?.email || '';
        this.providerId = defaultValue?.providerId || '';
        this.photoURL = defaultValue?.photoURL || '';
        this.uid = defaultValue?.uid || '';
    }
}