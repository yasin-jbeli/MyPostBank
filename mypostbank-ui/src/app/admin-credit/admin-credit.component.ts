import {Component, OnInit} from '@angular/core';
import {CreditControllerService} from "../services/services/credit-controller.service";
import {AdminControllerService} from "../services/services/admin-controller.service";
import {CreditDto} from "../services/models/credit-dto";
import {RepaymentDetailDto} from "../services/models/repayment-detail-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileService} from "../services/files/FileService";

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
  private snackBar: MatSnackBar;

  constructor(private adminService: AdminControllerService,
              private creditService: CreditControllerService,
              private fileService: FileService) {}

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
    if (confirm('Are you sure you want to reject this credit application?')) {
      const requestParams = { creditId: id };
      this.adminService.rejectCredit(requestParams).subscribe({
        next: () => {
          this.snackBar.open('Credit application rejected successfully', 'Dismiss', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error rejecting credit application:', error);
          this.snackBar.open('Error rejecting credit application', 'Dismiss', {
            duration: 3000
          });
        }
      });
    }
  }

  approve(id: number) {
    if (confirm('Are you sure you want to approve this credit application?')) {
      const requestParams = { creditId: id };
      this.adminService.approveCredit(requestParams).subscribe({
        next: () => {
          this.snackBar.open('Credit application approved successfully', 'Dismiss', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error approving credit application:', error);
          this.snackBar.open('Error approving credit application', 'Dismiss', {
            duration: 3000
          });
        }
      });
    }
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

  downloadFiles(): void {
    const userId = 123;
    const documentType = 'loans';
    this.fileService.downloadFile(userId, documentType).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'files.zip';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading files:', error);
      }
    );
  }
}
