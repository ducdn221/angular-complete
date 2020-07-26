import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.route.params.subscribe((param: Params) => {
    //   this.id = +param['id'];
    //   this.recipe = this.recipeService.getRecipe(this.id);
    // })
    this.route.params.pipe(map((param: Params) => +param['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes')
      }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index == this.id;
        })
      })
    ).subscribe((recipe) => {
      this.recipe = recipe;
    })
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    // this.recipeService.deleteIngredient(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
