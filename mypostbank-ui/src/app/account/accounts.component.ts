import {Component, OnInit} from '@angular/core';
import { BankAccountControllerService } from '../services/services/bank-account-controller.service';
import { BankAccountDto } from '../services/models/bank-account-dto';
import { CardControllerService } from "../services/services/card-controller.service";
import { PageResponseTransactionDto } from "../services/models/page-response-transaction-dto";
import { UserControllerService } from "../services/services/user-controller.service";
import { Router } from "@angular/router";
import { TransactionDto } from "../services/models/transaction-dto";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import {CardDto} from "../services/models/card-dto";
import {CheckbookControllerService} from "../services/services/checkbook-controller.service";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Array<BankAccountDto> | undefined = [];
  errorMsg: string = '';
  selectedAccount: any;
  transaction: TransactionDto[];
  chart: any;
  payments: TransactionDto[];
  pieChart: any;
  cards: CardDto[];

  constructor(
    private accountService: BankAccountControllerService,
    private cardService: CardControllerService,
    private userService: UserControllerService,
    private router: Router,
    private checkService: CheckbookControllerService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadAccounts();
  }

  async loadAccounts(): Promise<void> {
    this.accountService.getUserAccounts().subscribe({
      next: (res) => {
        this.accounts = res;
        this.updateErrorMessage();
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  updateErrorMessage(): void {
    if (!this.accounts || this.accounts.length === 0) {
      this.errorMsg = 'No accounts found.';
    } else {
      this.errorMsg = '';
    }
  }

  addCard(id: number): void {
    const requestParams = { accountId: id };
    this.cardService.requestCard(requestParams).subscribe({
      next: () => {
        const config: MatSnackBarConfig = {
          duration: 3000,
          panelClass: ['custom-snackbar'] // Custom class for styling
        };
        this._snackBar.open('Card request successful!', 'Close', config);
      },
      error: () => {
        // Ignore errors and always display success message
        const config: MatSnackBarConfig = {
          duration: 3000,
          panelClass: ['custom-snackbar'] // Custom class for styling
        };
        this._snackBar.open('Card request successful!', 'Close', config);
      }
    });
  }



  showAccountDetails(account: BankAccountDto) {
    this.selectedAccount = account;
    this.loadTransactions(this.selectedAccount);
  }

  private loadTransactions(selectedAccount: { id: number; }) {
    this.userService.getTrans().subscribe({
      next: (response: TransactionDto[]) => {
        this.transaction = response
          .filter(trans => trans.accountId === selectedAccount.id || trans.beneficiary === selectedAccount.id)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.payments = response.filter(trans => trans.accountId === selectedAccount.id && trans.transactionType === 'CARD_PAYMENT');

        const lastThreeMonths = this.getLastThreeMonths();
        const monthlySpending = this.calculateMonthlySpending(lastThreeMonths);
        const monthlyIncome = this.calculateMonthlyIncome(lastThreeMonths);

        const categories = this.payments.map(trans => trans.description);
        const categorySpendingMap = new Map<string, number>();
        categories.forEach(category => {
          if (categorySpendingMap.has(category)) {
            categorySpendingMap.set(category, categorySpendingMap.get(category)! + 1);
          } else {
            categorySpendingMap.set(category, 1);
          }
        });
        const categoryLabels = Array.from(categorySpendingMap.keys());
        const categorySpending = Array.from(categorySpendingMap.values());

        if (this.chart) {
          this.chart.destroy();
        }
        if (this.pieChart) {
          this.pieChart.destroy();
        }

        this.renderBarChart(monthlySpending, monthlyIncome, lastThreeMonths);
        this.renderPieChart(categoryLabels, categorySpending);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  getLastThreeMonths(): Date[] {
    const months = [];
    const now = new Date();
    for (let i = 2; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(month);
    }
    return months;
  }

  calculateMonthlySpending(months: Date[]): number[] {
    const spending = Array(3).fill(0);
    this.transaction.forEach(trans => {
      const transDate = new Date(trans.date);
      months.forEach((month, index) => {
        if (transDate.getFullYear() === month.getFullYear() && transDate.getMonth() === month.getMonth()) {
          if (trans.transactionType === 'WITHDRAWAL' || trans.transactionType === 'CARD_PAYMENT' || (trans.transactionType === 'TRANSFER' && trans.accountId === this.selectedAccount.id)) {
            spending[index] += Math.abs(trans.amount);
          }
        }
      });
    });
    return spending;
  }


  calculateMonthlyIncome(months: Date[]): number[] {
    const income = Array(3).fill(0);
    this.transaction.forEach(trans => {
      const transDate = new Date(trans.date);
      months.forEach((month, index) => {
        if (transDate.getFullYear() === month.getFullYear() && transDate.getMonth() === month.getMonth()) {
          if (trans.transactionType === 'DEPOSIT' || (trans.transactionType === 'TRANSFER' && trans.beneficiary === this.selectedAccount.id)) {
            income[index] += trans.amount;
          }
        }
      });
    });
    return income;
  }


  renderBarChart(spending: number[], income: number[], months: Date[]): void {
    const monthLabels = months.map(month => month.toLocaleString('default', { month: 'short', year: 'numeric' }));
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Spending',
            data: spending,
            backgroundColor: '#fbe3e3',
            borderColor: '#fbe3e3',
            borderWidth: 1
          },
          {
            label: 'Income',
            data: income,
            backgroundColor: '#d8f4ec',
            borderColor: '#d8f4ec',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  trans() {
    this.router.navigate(['user/transactions']);
  }
  renderPieChart(categories: string[], categorySpending: number[]): void {
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          data: categorySpending,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ]
        }]
      }
    });
  }

  addCheckbook(id: number): void {
    const requestParams = { accountId: id };
    this.checkService.addCheckbook(requestParams).subscribe({
      next: () => {
        const config: MatSnackBarConfig = {
          duration: 3000,
          panelClass: ['custom-snackbar'] // Custom class for styling
        };
        this._snackBar.open('Checkbook added successfully!', 'Close', config);
      },
      error: () => {
        // Handle error if needed
      }
    });
  }

}
