import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [AlertComponent, LoadSpinnerComponent, PlaceholderDirective, DropdownDirective],
    imports: [CommonModule],
    exports: [AlertComponent, LoadSpinnerComponent, PlaceholderDirective, DropdownDirective, CommonModule]

})
export class SharedModule { }