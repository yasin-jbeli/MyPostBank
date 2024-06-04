import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationControllerService } from '../../services/services/authentication-controller.service';
import { ResetPassword$Params } from '../../services/fn/authentication-controller/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private authService: AuthenticationControllerService) {
    this.resetForm = this.fb.group({
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const resetPass: ResetPassword$Params = {
        token: this.resetForm.value.token,
        newPassword: this.resetForm.value.newPassword
      };
      this.authService.resetPassword(resetPass)
        .subscribe(
          () => this.message = 'Password reset successfully.',
          error => this.message = 'An error occurred. Please try again.'
        );
    }
  }
}
