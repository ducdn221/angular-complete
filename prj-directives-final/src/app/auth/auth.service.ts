import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}


@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAS1qsRVgRE8X7hvt7CFbK_H-_CYndlJPY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
    }

}