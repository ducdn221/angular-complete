import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject, from } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

    // signup(email: string, password: string) {
    //     return this.http
    //         .post<AuthResponseData>(
    //             'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.fireBaseAPIKey,
    //             {
    //                 email: email,
    //                 password: password,
    //                 returnSecureToken: true
    //             }
    //         )
    //         .pipe(
    //             catchError(this.handleError),
    //             tap(resData => {
    //                 this.handleAuthentication(
    //                     resData.email,
    //                     resData.localId,
    //                     resData.idToken,
    //                     +resData.expiresIn
    //                 );
    //             })
    //         );
    // }

    // login(email: string, password: string) {
    //     return this.http
    //         .post<AuthResponseData>(
    //             'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.fireBaseAPIKey,
    //             {
    //                 email: email,
    //                 password: password,
    //                 returnSecureToken: true
    //             }
    //         )
    //         .pipe(
    //             catchError(this.handleError),
    //             tap(resData => {
    //                 this.handleAuthentication(
    //                     resData.email,
    //                     resData.localId,
    //                     resData.idToken,
    //                     +resData.expiresIn
    //                 );
    //             })
    //         );
    // }

    logout() {
        // this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    setLogoutTimer(expirationDuration) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
            // this.logout();
        }, expirationDuration)
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    // autoLogin() {
    //     const userData: {
    //         email: string;
    //         id: string;
    //         _token: string;
    //         _tokenExpirationDate: string;
    //     } = JSON.parse(localStorage.getItem('userData'));
    //     if (!userData) {
    //         return null;
    //     }

    //     const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    //     if (loadedUser.token) {
    //         this.store.dispatch(new AuthActions.AuthenticateSuccess({ email: userData.email, userId: userData.id, token: userData._token, expirationDate: new Date(userData._tokenExpirationDate) }))
    //         const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //         // this.autoLogout(expirationDuration);
    //         // this.user.next(loadedUser);
    //     }
    // }

    // private handleAuthentication(
    //     email: string,
    //     userId: string,
    //     token: string,
    //     expiresIn: number
    // ) {
    //     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //     const user = new User(email, userId, token, expirationDate);
    //     // this.user.next(user);
    //     this.store.dispatch(new AuthActions.AuthenticateSuccess({ email: email, userId: userId, token: token, expirationDate: expirationDate }));
    //     // this.autoLogout(expiresIn * 1000);
    //     localStorage.setItem('userData', JSON.stringify(user));
    // }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return throwError(errorMessage);
    }
}
