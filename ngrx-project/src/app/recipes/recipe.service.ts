import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.action"
import * as fromAuth from '../store/app.reducer'
import * as RecipeActions from './store/recipe.actions';
@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    // new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('French Fries', 20)
    // ]),
    // new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [
    //     new Ingredient('Buns', 2),
    //     new Ingredient('Meat', 1)
    // ])
    constructor(private slService: ShoppingListService, private store: Store<fromAuth.AppState>) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        // this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addIngredient(newRecipe: Recipe) {
        // this.recipes.push(newRecipe);
        // this.recipesChanged.next(this.recipes.slice());
        this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
    }

    updateIngredient(id: number, newRecipe: Recipe) {
        // this.recipes[id] = newRecipe;
        // this.recipesChanged.next(this.recipes.slice());
        this.store.dispatch(new RecipeActions.UpdateRecipe({ id: id, newRecipe: newRecipe }));
    }

    deleteIngredient(id: number) {
        // this.recipes.splice(id, 1);
        // this.recipesChanged.next(this.recipes.slice());
        this.store.dispatch(new RecipeActions.DeleteRecipe(id));
    }
}