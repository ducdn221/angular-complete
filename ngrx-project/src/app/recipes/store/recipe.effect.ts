import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects'
import * as RecipeActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffect {
    @Effect()
    fetchRecipe = this.action$.pipe(ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-d7f83.firebaseio.com/recipes.json')
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }),
        map(recipes => {
            return new RecipeActions.SetRecipes(recipes);
        })

    )

    @Effect({ dispatch: false })
    storeRecipes = this.action$.pipe(ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipeState]) => {
            console.log(actionData, recipeState);
            return this.http.put('https://ng-course-recipe-book-d7f83.firebaseio.com/recipes.json', recipeState.recipes);
        })
    )
    constructor(private action$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}