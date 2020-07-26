import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // })

    this.subscription = this.store
      .select('recipes')
      .pipe(map(recipesData => recipesData.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
