import {Component, OnInit} from '@angular/core';
import {CreditControllerService} from "../services/services/credit-controller.service";
import {BankAccountDto} from "../services/models/bank-account-dto";
import {BankAccountControllerService} from "../services/services/bank-account-controller.service";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {
  loanRequest: any = {};
  loanOptions: any[] = [];
  selectedAccount: BankAccountDto;
  sourceAccounts: BankAccountDto[];
  selectedLoanOption: any;
  applicationForm: File;
  bankStatements: File;
  proofOfIncome: File;
  selectedOption: any;
  fileNames: { [key: string]: string } = {};

  constructor(
    private creditService: CreditControllerService,
    private accountService: BankAccountControllerService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  submitLoanRequest(): void {
    if (!this.selectedAccount) {
      console.error('Please select an account.');
      return;
    }

    if (!this.selectedLoanOption) {
      console.error('Please select a loan option.');
      return;
    }

    const requestParams = {
      amount: this.selectedLoanOption.amount,
      rate: this.selectedLoanOption.rate,
      duration: this.selectedLoanOption.duration,
      accountId: this.selectedAccount.id,
      body: {
        form: this.applicationForm,
        statements: this.bankStatements,
        proof: this.proofOfIncome
      }
    };

    console.log('Request parameters:', requestParams);
    this.creditService.requestLoan(requestParams)
      .subscribe(() => {
        this.loanRequest = {};
      });
  }


  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    switch(fileType) {
      case 'applicationForm':
        this.applicationForm = file;
        break;
      case 'bankStatements':
        this.bankStatements = file;
        break;
      case 'proofOfIncome':
        this.proofOfIncome = file;
        break;
      default:
        console.error('Invalid file type');
    }
  }


  generateLoanOptions(amount: number): any[] {
    const interestRate = 0.07;
    const durations = [12, 24, 36];

    return durations.map(duration => {
      const monthlyInterestRate = interestRate / 12;
      const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -duration));
      const totalPayment = monthlyPayment * duration;
      const rate = Math.round((totalPayment - amount) / amount * 100);

      return {duration, rate};
    });
  }

  onAmountChange() {
    const amount = this.loanRequest.amount;
    this.loanOptions = this.generateLoanOptions(amount);
  }

  calculateTotalAmount(option: any): number {
    const amount = this.loanRequest.amount;
    const interestRate = option.rate / 100;
    const duration = option.duration;
    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -duration));
    return monthlyPayment * duration;
  }

  loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.sourceAccounts = res.filter(acc => acc.status === 'ACTIVE' && acc.accountType === 'CHECKING');
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  selectLoanOption(option: any, amount: number) {
    this.selectedLoanOption = option;
    this.selectedLoanOption.amount = amount;
    this.selectedLoanOption.accountId = this.selectedAccount.id;
  }


}
