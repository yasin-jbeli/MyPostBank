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
  successMsg: string[] = [];
  errorMsg: string[] = [];

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
          () => {
            this.successMsg.push('Password reset successfully.');
            this.errorMsg = [];
          },
          error => {
            this.errorMsg.push('Invalid token. Please try again.');
            this.successMsg = [];
          }
        );
    }
  }
}
