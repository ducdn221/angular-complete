import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode) {
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signup(email, password).subscribe(
        (res) => {
          this.isLoading = false;
          console.log(res);
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
          this.error = "An error occured";
        }
      );
    }
    form.reset();
  }
}
