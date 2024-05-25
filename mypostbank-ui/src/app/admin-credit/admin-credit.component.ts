import {Component, OnInit} from '@angular/core';
import {CreditControllerService} from "../services/services/credit-controller.service";
import {AdminControllerService} from "../services/services/admin-controller.service";
import {CreditDto} from "../services/models/credit-dto";
import {RepaymentDetailDto} from "../services/models/repayment-detail-dto";

@Component({
  selector: 'app-admin-credit',
  templateUrl: './admin-credit.component.html',
  styleUrl: './admin-credit.component.scss'
})
export class AdminCreditComponent implements OnInit{
  requests: CreditDto[];
  loans: CreditDto[];
  selectedLoan: CreditDto;
  payments: RepaymentDetailDto[];

  constructor(private adminService: AdminControllerService,
              private creditService: CreditControllerService) {}

  ngOnInit(): void {
    this.loadLoans();
    this.loadRequests();
  }

  private loadLoans() {
    this.adminService.getAllLoans().subscribe({
      next: (res: CreditDto[]) => {
        this.loans = res.filter(loan => !(loan.status === 'PENDING'));
      },
      error: (error) => {
        console.error('Error loading loans:', error);
      }
    });
  }

  private loadRequests() {
    this.adminService.creditRequests().subscribe({
      next: (res: CreditDto[]) => {
        this.requests = res.filter(loan => loan.status === 'PENDING');
      },
      error: (error) => {
        console.error('Error loading requests:', error);
      }
    });
  }

  reject(id: number) {
    const requestParams = {
      creditId: id
    };
    this.adminService.rejectCredit(requestParams).subscribe();
  }

  approve(id: number) {
    const requestParams = {
      creditId: id
    };
    this.adminService.approveCredit(requestParams).subscribe();
  }


  togglePaymentDetails(loan: CreditDto) {
    this.loadInstallments(loan.id);
    this.selectedLoan = this.selectedLoan === loan ? null : loan;
  }

  private loadInstallments(id: number) {
    const requestParams = {
      creditId: id
    };
    this.adminService.getInstallments(requestParams).subscribe({
      next: (res: RepaymentDetailDto[]) => {
        this.payments = res;
      }
    })
  }
}
