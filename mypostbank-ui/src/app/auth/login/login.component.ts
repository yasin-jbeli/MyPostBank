import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../services/services/authentication-controller.service';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService
  ) { }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (res) => {
        this.tokenService.token = res.accessToken as string;
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.handleError(err, 'An error occurred during authentication.');
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  private handleError(err: any, defaultMessage: string) {
    if (err.status === 401) {
      this.errorMsg.push('Unauthorized: Invalid credentials or session has expired.');
    } else if (err.status === 403) {
      this.errorMsg.push('Forbidden: You do not have permission to access this resource.');
    } else if (err.error && err.error.validationErrors) {
      this.errorMsg = err.error.validationErrors;
    } else if (err.message) {
      this.errorMsg.push(err.message);
    } else {
      this.errorMsg.push(defaultMessage);
    }
  }
}
