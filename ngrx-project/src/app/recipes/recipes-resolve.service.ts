import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Actions, ofType } from "@ngrx/effects"
import * as fromApp from "../store/app.reducer"
import { Store } from "@ngrx/store";
import * as RecipeActions from "./store/recipe.actions"
import { take, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolve implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService, private action$: Actions, private store: Store<fromApp.AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(take(1), map(state => {
            return state.recipes;

        }),
            switchMap(recipes => {
                if (recipes.length == 0) {
                    this.store.dispatch(new RecipeActions.FetchRecipes());
                    return this.action$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
                } else {
                    return of(recipes);
                }
            }))


        // if (this.recipesService.getRecipes().length == 0) {
        //     return this.dataStorageService.fetchData();
        // } else { return this.recipesService.getRecipes() }

    }
}