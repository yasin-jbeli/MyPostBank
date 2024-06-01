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
  destinationAccounts: BankAccountDto[] = [];
  filteredAccounts: Observable<BankAccountDto[]>;
  errorMsg: any;

  constructor(
    private userService: UserControllerService,
    private accountService: BankAccountControllerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadDestinationAccounts();

    this.filteredAccounts = this.transferForm.get('destinationAccount').valueChanges.pipe(
      startWith(''),
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

  private filterAccounts(value: string | BankAccountDto): BankAccountDto[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    if (!this.destinationAccounts) {
      return [];
    }
    return this.destinationAccounts.filter(account =>
      account.owner.toLowerCase().includes(filterValue) ||
      account.accountNo.includes(filterValue)
    );
  }


  onSubmit(): void {
    if (this.transferForm.invalid) {
      return;
    }

    const sourceAccountId = this.transferForm.get('sourceAccountId').value;
    const destinationAccount = this.transferForm.get('destinationAccount').value;
    const amount = this.transferForm.get('amount').value;

    if (!sourceAccountId || !destinationAccount) {
      console.error('Source or Destination Account ID is empty');
      return;
    }

    this.userService.transferFunds({ sourceAccountId, destinationAccountId: destinationAccount.id, amount })
      .subscribe({
        next: (response) => {
          console.log('Transfer successful:', response);
          this.transferForm.reset();
          this.snackBar.open('Transfer successful', 'Dismiss', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error transferring funds:', error);
        }
      });
  }

  private loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.sourceAccounts = res.filter(acc => acc.status === 'ACTIVE' && acc.accountType === 'CHECKING');
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  private loadDestinationAccounts(): void {
    this.accountService.getAllAccountsNotAdmin().pipe(
      catchError(error => {
        console.error('Error loading destination accounts:', error);
        return of([]);
      })
    ).subscribe({
      next: (res: BankAccountDto[]) => {
        this.destinationAccounts = res.filter(acc => acc.status === 'ACTIVE');
      }
    });
  }
}
