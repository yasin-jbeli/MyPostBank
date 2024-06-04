import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationControllerService} from '../../services/services/authentication-controller.service';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {TokenService} from '../../services/token/token.service';
import {UserControllerService} from "../../services/services/user-controller.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService,
    private userService: UserControllerService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.accessToken as string;
        this.userService.getUserDetails().subscribe({
          next: (user) => {
            const role = user.role;
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user/dashboard']);
            }
          },
          error: (err) => {
            console.error('Error fetching user details:', err);
            // Redirect to a default route in case of error
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        console.error('Error:', err);
        if (err.error && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.message || 'An error occurred.');
        }
      }
    });
  }


  register() {
    this.router.navigate(['register']);
  }

  recover() {
    this.router.navigate(['request-password-reset']);
  }
}
