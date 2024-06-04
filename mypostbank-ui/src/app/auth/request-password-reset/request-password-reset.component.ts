import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationControllerService } from '../../services/services/authentication-controller.service';
import { SendResetEmail$Params } from '../../services/fn/authentication-controller/send-reset-email';
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {
  resetForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private authService: AuthenticationControllerService, private router: Router) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const resetPass: SendResetEmail$Params = { email: this.resetForm.value.email };
      this.authService.sendResetEmail(resetPass)
        .subscribe(
          () => {
            this.message = 'Password reset email sent successfully.';
            this.router.navigate(['/reset-password']); // Navigate to Reset Password page
          },
          error => this.message = 'An error occurred. Please try again.'
        );
    }
  }
}
