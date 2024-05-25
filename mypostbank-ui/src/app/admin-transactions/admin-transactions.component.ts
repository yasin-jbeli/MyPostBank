import { Component, OnInit } from '@angular/core';
import { AdminControllerService } from "../services/services/admin-controller.service";
import { PageResponseTransactionDto } from "../services/models/page-response-transaction-dto";
import {TransactionDto} from "../services/models/transaction-dto";

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  styleUrls: ['./admin-transactions.component.scss'] // Fix styleUrl to styleUrls
})
export class AdminTransactionsComponent implements OnInit {
  transaction: PageResponseTransactionDto | undefined;
  errorMsg: string = '';
  pageIndex: number = 0;
  pageSize: number = 12;
  totalTransactions: number = 0;
  searchKeyword: string = '';

  constructor(private adminService: AdminControllerService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.adminService.getAllTransactions({
      page: this.pageIndex,
      size: this.pageSize
    }).subscribe({
      next: (response) => {
        this.transaction = response;
        this.totalTransactions = response.totalElements;
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  applySearch(): void {
    const searchKeyword = this.searchKeyword.trim().toLowerCase();

    if (searchKeyword !== '') {
      this.transaction.content = this.transaction.content.filter(trans => {
        const descriptionMatch = trans.description.toLowerCase().includes(searchKeyword);
        const typeMatch = trans.transactionType?.toLowerCase().includes(searchKeyword); // Optional chaining for Type
        return descriptionMatch && typeMatch;
      });
    } else {
      this.loadTransactions();
    }
  }

  onPageChange($event: any): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadTransactions();
  }
}
