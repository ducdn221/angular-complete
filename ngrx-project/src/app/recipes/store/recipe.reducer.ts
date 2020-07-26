import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipe.actions";

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }

        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.id],
                ...action.payload.newRecipe
            }
            let newRecipes = [...state.recipes];
            newRecipes[action.payload.id] = updatedRecipe;
            return {
                ...state,
                recipes: newRecipes
            }
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload
                })
            }
        default:
            return state;
    }
}