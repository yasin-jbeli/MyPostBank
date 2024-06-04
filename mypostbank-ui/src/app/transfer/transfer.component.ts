import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserControllerService } from '../services/services/user-controller.service';
import { BankAccountControllerService } from "../services/services/bank-account-controller.service";
import { BankAccountDto } from "../services/models/bank-account-dto";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  sourceAccounts: BankAccountDto[] = [];
  destinationAccounts: BankAccountDto[];
  filteredAccounts: Observable<BankAccountDto[]>;
  errorMsg: string[] = [];
  successMessage: string[];

  constructor(
    private userService: UserControllerService,
    private accountService: BankAccountControllerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadDestinationAccounts();

    this.filteredAccounts = this.transferForm.get('destinationAccount').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : this.displayFn(value))),
      map(value => this.filterAccounts(value))
    );
  }

  initForm(): void {
    this.transferForm = this.formBuilder.group({
      sourceAccountId: [null, Validators.required],
      destinationAccount: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  private filterAccounts(value: string): BankAccountDto[] {
    const filterValue = value.toLowerCase();
    const sourceAccountId = this.transferForm.get('sourceAccountId').value;

    if (this.destinationAccounts && this.destinationAccounts.length > 0) {
      return this.destinationAccounts.filter(account =>
        (account.owner.toLowerCase().includes(filterValue) ||
          account.accountNo.includes(filterValue)) &&
        account.id !== sourceAccountId
      );
    } else {
      return [];
    }
  }

  displayFn(account?: BankAccountDto): string {
    return account ? `${account.owner} - ${account.accountNo}` : '';
  }

  onSubmit(): void {
    this.errorMsg = [];
    this.successMessage= [];

    if (this.transferForm.invalid) {
      return;
    }

    const sourceAccountId = this.transferForm.get('sourceAccountId').value;
    const destinationAccount = this.transferForm.get('destinationAccount').value;
    const amount = this.transferForm.get('amount').value;

    if (!sourceAccountId || !destinationAccount) {
      this.errorMsg.push('Source or Destination Account ID is empty');
      return;
    }

    const recipientInfo = `${destinationAccount.owner} (Account No: ${destinationAccount.accountNo})`;

    if (confirm(`Are you sure you want to transfer ${amount} to ${recipientInfo}?`)) {
      this.userService.transferFunds({ sourceAccountId, destinationAccountId: destinationAccount.id, amount })
        .subscribe(
          (response) => {
            console.log('Transfer successful:', response);
            this.transferForm.reset();
          },
          (error) => {
            console.error('Error transferring funds:', error);
            if (error.status === 400 || error.status === 500) {
              this.errorMsg.push('Insufficient balance');
              if(error.status === 200) {
                this.successMessage.push('Transfer successful');
              }
            } else {
              this.successMessage.push('Transfer successful');
            }
          }
        );
    }
  }


  private loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.sourceAccounts = res.filter(acc => acc.status === 'ACTIVE' && acc.accountType === 'CHECKING');
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
        this.errorMsg.push('Error loading accounts');
      }
    });
  }

  private loadDestinationAccounts(): void {
    this.accountService.getAllAccountsNotAdmin().pipe(
      catchError(error => {
        console.error('Error loading destination accounts:', error);
        this.errorMsg.push('Error loading destination accounts');
        return of([]);
      })
    ).subscribe({
      next: (res: BankAccountDto[]) => {
        this.destinationAccounts = res.filter(acc => acc.status === 'ACTIVE');
      }
    });
  }
}
