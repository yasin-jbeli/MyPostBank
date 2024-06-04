import { Component, OnInit } from '@angular/core';
import { AdminControllerService } from "../services/services/admin-controller.service";
import { BankAccountDto } from "../services/models/bank-account-dto";
import { UserDto } from "../services/models/user-dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {FileService} from "../services/files/FileService";

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.scss']
})
export class AdminAccountsComponent implements OnInit {
  accounts: BankAccountDto[];
  requests: BankAccountDto[];

  constructor(private adminService: AdminControllerService, private snackBar: MatSnackBar,private fileService: FileService) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.loadRequests();
  }

  private loadAccounts() {
    this.adminService.getAllAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.accounts = res.filter(acc => !(acc.status === 'PENDING'));
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  delete(accountId: any) {
    const requestParams = { accountId: accountId };
    this.adminService.closeAccount(requestParams).subscribe(() => {
      this.loadAccounts();
    });
  }

  private loadRequests() {
    this.adminService.getPendingAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.requests = res;
      },
      error: (error) => {
        console.error('Error loading requests:', error);
      }
    });
  }

  rejectAccount(id: number) {
    if (confirm('Are you sure you want to reject this account?')) {
      const requestParams = { accountId: id };
      this.adminService.rejectAccount(requestParams).subscribe(() => {
        this.snackBar.open('Account rejected successfully', 'Dismiss', { duration: 3000 });
        this.loadRequests(); // Reload requests after rejecting an account
      }, error => {
        console.error('Error rejecting account:', error);
        this.snackBar.open('Error rejecting account', 'Dismiss', { duration: 3000 });
      });
    }
  }

  approveAccount(id: number) {
    if (confirm('Are you sure you want to approve this account?')) {
      const requestParams = { accountId: id };
      this.adminService.activateAccount1(requestParams).subscribe(() => {
        this.snackBar.open('Account approved successfully', 'Dismiss', { duration: 3000 });
        this.loadRequests(); // Reload requests after approving an account
      }, error => {
        console.error('Error approving account:', error);
        this.snackBar.open('Error approving account', 'Dismiss', { duration: 3000 });
      });
    }
  }
  downloadFiles(): void {
    const userId = 402;
    const documentType = 'BANK_account';
    this.fileService.downloadFile(userId, documentType).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        window.open(url, '_blank'); // Open the file in a new tab
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading files:', error);
      }
    );
  }
}
