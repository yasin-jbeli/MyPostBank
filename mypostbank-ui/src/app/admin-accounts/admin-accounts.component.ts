import { Component, OnInit } from '@angular/core';
import { AdminControllerService } from "../services/services/admin-controller.service";
import { BankAccountDto } from "../services/models/bank-account-dto";
import {UserDto} from "../services/models/user-dto";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.scss']
})
export class AdminAccountsComponent implements OnInit {
  accounts: BankAccountDto[];
  requests: BankAccountDto[];

  constructor(private adminService: AdminControllerService) {}

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
    const requestParams = {
      accountId: accountId
    };
    this.adminService.closeAccount(requestParams).subscribe();
    this.loadAccounts();
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

  reject(id: number) {
    const requestParams = {
      accountId: id
    };
    this.adminService.rejectAccount(requestParams).subscribe();
  }

  approve(id: number) {
    const requestParams = {
      accountId: id
    };
    this.adminService.activateAccount1(requestParams).subscribe();
  }
}



