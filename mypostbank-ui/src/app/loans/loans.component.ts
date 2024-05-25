import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CreditControllerService } from "../services/services";
import { CreditDto } from "../services/models/credit-dto";
import { Router } from "@angular/router";
import { registerables } from 'chart.js';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  @ViewChild('loanProgressChart') loanProgressChart: ElementRef<HTMLCanvasElement>;
  installment: any[] = [];
  credit: CreditDto;
  creditId: number;
  paidAmountValue: number = 0;
  remainingBalanceValue: number = 0;
  chart: any;

  constructor(private creditService: CreditControllerService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadCredit();
  }

  loadCredit(): void {
    this.creditService.ongoingLoans().subscribe({
      next: (credit) => {
        this.credit = credit;

        this.creditId = this.credit.id;
        this.getAllPayments();
      },
      error: (error) => {
        console.error("Error loading credit:", error);
      }
    });
  }

  getAllPayments(): void {
    const params = { creditId: this.creditId };
    this.creditService.getAllRepaymentsByUser(params).subscribe({
      next: (data: any[]) => {
        this.installment = data.sort((a, b) => a.month - b.month);
        this.paidAmountValue = this.paidAmount();
        console.log(this.paidAmountValue);
        this.remainingBalanceValue = this.remainingBalance();
        console.log(this.remainingBalanceValue);
        this.renderChart(); // Ensure the chart is rendered after data is loaded
      },
      error: (error) => {
        console.error('Error fetching installments:', error);
      }
    });
  }

  paidAmount(): number {
    if (!this.installment || this.installment.length === 0) {
      console.log('No installment data available');
      return 0;
    }

    const paidAmount = this.installment.reduce((total, inst) => {
      if (inst.paymentStatus === 'PAID' && typeof inst.paymentAmount === 'number') {
        return total + inst.paymentAmount;
      }
      return total;
    }, 0);

    console.log('Paid amount:', paidAmount);
    return paidAmount;
  }

  remainingBalance(): number {
    const totalLoanAmount = this.credit.amount * (this.credit.interestRate / 100) + this.credit.amount;
    const totalPaidAmount = this.paidAmount();
    const remaining = totalLoanAmount - totalPaidAmount;
    return parseFloat(remaining.toFixed(2));
  }

  renderChart(): void {
    const ctx = this.loanProgressChart?.nativeElement;
    if (!ctx) {
      console.error('Canvas element not found!');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Paid Amount', 'Remaining Balance'],
        datasets: [
          {
            data: [this.paidAmountValue, this.remainingBalanceValue],
            backgroundColor: ['#4caf50', '#f44336'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
