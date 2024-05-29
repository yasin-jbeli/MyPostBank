import { Component } from '@angular/core';
import { BankAccountControllerService } from '../services/services/bank-account-controller.service';
import { Router } from "@angular/router";
import { take } from 'rxjs/operators';
import { OpenAccount$Params } from "../services/fn/bank-account-controller/open-account";

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.scss']
})
export class OpenAccountComponent {

  accountType: 'CHECKING' | 'SAVINGS' | null = null;
  idFile: File | null = null;
  errorMsg: string = '';
  selectedFileName: string = '';

  constructor(
    private router: Router,
    private accountService: BankAccountControllerService
  ) { }

  onSubmit(): void {
    if (this.accountType && this.idFile) {
      const formData = new FormData();
      formData.append('accountType', this.accountType);
      formData.append('file', this.idFile);

      const params: OpenAccount$Params = {
        accountType: this.accountType,
        body: {
          file: this.idFile
        }
      };

      this.accountService.openAccount(params)
        .pipe(take(1))
        .subscribe(
          () => {
            console.log('Account opened successfully');
          },
          (error: any) => {
            console.error('Error opening account', error);
            this.errorMsg = 'Error opening account. Please try again.';
          }
        );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.idFile = file;  // Add this line to assign the selected file to idFile
      this.selectedFileName = file.name;
    } else {
      this.selectedFileName = '';
    }
  }
}
