import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { AdminControllerService } from "../services/services/admin-controller.service";
import { BankAccountDto } from "../services/models/bank-account-dto";
import { CardDto } from "../services/models/card-dto";
import { CreditDto } from "../services/models/credit-dto";
import { TransactionDto } from "../services/models/transaction-dto";
import { UserDto } from "../services/models/user-dto";
import { Chart } from 'chart.js/auto';
import moment from 'moment';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  accounts: BankAccountDto[];
  cards: CardDto[];
  loans: CreditDto[];
  trans: TransactionDto[];
  depositTotal: number = 0;
  withdrawalTotal: number = 0;
  transferTotal: number = 0;
  cardPaymentTotal: number = 0;
  users: UserDto[];

  @ViewChild('userChart', { static: true }) userChart: ElementRef<HTMLCanvasElement>;
  today: string;
  private intervalSubscription: Subscription;

  constructor(
    private router: Router,
    private adminService: AdminControllerService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.today = currentDate.toLocaleDateString(undefined, options);

    this.intervalSubscription = interval(60000).subscribe(() => {
      const updatedDate = new Date();
      this.today = updatedDate.toLocaleDateString(undefined, options); // Update the date every minute
    });
    this.loadAccounts();
    this.loadCards();
    this.loadLoans();
    this.loadTrans();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.renderUserChart();
  }

  loadAccounts() {
    this.adminService.getAllAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.accounts = res.filter(acc => acc.status === 'PENDING');
      }
    })
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res: UserDto[]) => {
        this.users = res;
        this.renderUserChart();
      }
    })
  }

  loadCards() {
    this.adminService.getAllCards().subscribe({
      next: (res: CardDto[]) => {
        this.cards = res.filter(crd => crd.status === 'PENDING');
      }
    })
  }

  loadLoans() {
    this.adminService.getAllLoans().subscribe({
      next: (res: CreditDto[]) => {
        this.loans = res.filter(ln => ln.status === 'PENDING');
      }
    })
  }

  private loadTrans() {
    this.adminService.getAllTrans().subscribe(data => {
      this.trans = data;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    if (this.trans) {
      this.trans.forEach(trans => {
        switch (trans.transactionType) {
          case 'DEPOSIT':
            this.depositTotal += trans.amount;
            break;
          case 'WITHDRAWAL':
            this.withdrawalTotal += trans.amount;
            break;
          case 'TRANSFER':
            this.transferTotal += trans.amount;
            break;
          case 'CARD_PAYMENT':
            this.cardPaymentTotal += trans.amount;
            break;
        }
      });
    }
  }

  private renderUserChart() {
    if (!this.userChart) {
      return;
    }

    const currentDate = moment();
    const labels = [];
    const data = [];

    for (let i = 2; i >= 0; i--) {
      const month = currentDate.clone().subtract(i, 'months');
      labels.push(month.format('MMMM'));
      data.push(this.users.filter(user => moment(user.dateJoined).isSame(month, 'month')).length);
    }

    new Chart(this.userChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Users Joined',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  navBA() {
    this.router.navigate(['admin/accounts']);
  }

  navCa() {
    this.router.navigate(['admin/cards']);
  }

  navLo() {
    this.router.navigate(['admin/credit']);
  }

  navTrans() {
    this.router.navigate(['admin/transactions']);
  }
}
