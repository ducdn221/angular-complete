import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
@Injectable(
    { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
        Observable<boolean | UrlTree> | boolean | UrlTree | Promise<UrlTree | boolean> {
        return this.store.select('auth').pipe(take(1), map(authState => authState.user), map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }))

    }
}