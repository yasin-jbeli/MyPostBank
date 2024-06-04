import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../services/services/authentication-controller.service';
import { RegisterRequest } from '../../services/models/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = { email: '', firstName: '', lastName: '', password: '', phone: '' };
  confirmPassword: string = '';
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) { }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];

    if (this.registerRequest.password !== this.confirmPassword) {
      this.errorMsg.push('Passwords do not match');
      return;
    }

    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
