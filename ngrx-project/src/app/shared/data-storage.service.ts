import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import * as RecipeActions from "../recipes/store/recipe.actions";
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-d7f83.firebaseio.com/recipes.json', recipes).subscribe(recipes => {
            console.log(recipes);
        })
    }

    fetchData() {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-d7f83.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
                tap(recipes => {
                    // this.recipeService.setRecipes(recipes);
                    this.store.dispatch(new RecipeActions.SetRecipes(recipes))

                }))
    }
}