import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserControllerService } from "../services/services/user-controller.service";
import { BankAccountControllerService } from "../services/services/bank-account-controller.service";
import { BankAccountDto } from "../services/models/bank-account-dto";
import { CreditControllerService } from "../services/services/credit-controller.service";
import { RepaymentDetailDto } from "../services/models/repayment-detail-dto";
import { CreditDto } from "../services/models/credit-dto";
import { PageResponseTransactionDto } from "../services/models/page-response-transaction-dto";
import {Notification} from "../services/models/notification";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  transaction: PageResponseTransactionDto | undefined;
  accounts: Array<BankAccountDto> | undefined = [];
  payments: Array<RepaymentDetailDto> | undefined = [];
  errorMsg: string = '';
  credit: CreditDto;
  creditId: number;
  totalTransactions: number = 0;
  notf: Notification[] = [];


  constructor(
    private router: Router,
    private userService: UserControllerService,
    private accountService: BankAccountControllerService,
    private creditService: CreditControllerService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadNotf();
    await this.loadTransactions();
    await this.loadAccounts();
    const creditData = await this.loadCredit();
    await this.loadNextPayment(creditData.id);
  }

  async loadCredit(): Promise<CreditDto> {
    try {
      const creditResponse = await this.creditService.ongoingLoans().toPromise();
      this.credit = creditResponse;
      return creditResponse;
    } catch (error) {
      console.error("Error loading credit:", error);
      throw error;
    }
  }

  async loadNextPayment(creditId: number): Promise<void> {
    const params = { creditId };
    this.creditService.getDuePayments(params).subscribe({
      next: (res: RepaymentDetailDto[]) => {
        this.payments = res.filter(pay => pay.paymentStatus === 'NOT_PAID');
      }
    });
  }

  async loadAccounts(): Promise<void> {
    this.accountService.getUserAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.accounts = res.filter(acc => acc.status === 'ACTIVE');
      }
    });
  }

  async loadTransactions(): Promise<void> {
    this.userService.getTransactionsByUser().subscribe({
      next: (response: PageResponseTransactionDto) => {
        this.transaction = response;
        this.totalTransactions = response.totalElements;
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  getTotalBalance(): number {
    if (!this.accounts || this.accounts.length === 0) {
      return 0;
    }
    return this.accounts.reduce((total, account) => total + account.balance, 0);
  }

  navigateToTransactions() {
    this.router.navigate(['user/transactions']);
  }

  navAccounts() {
    this.router.navigate(['user/accounts']);
  }

  navLoan() {
    this.router.navigate(['/ser/credit']);
  }
  loadNotf() {
    this.userService.getNotifications().subscribe(
      (res: Notification[]) => {
        this.notf = res.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }


}
