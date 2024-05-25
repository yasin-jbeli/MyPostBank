import { Component, OnInit } from '@angular/core';
import { PageResponseTransactionDto } from "../services/models/page-response-transaction-dto";
import { UserControllerService } from "../services/services/user-controller.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transaction: PageResponseTransactionDto | undefined;
  errorMsg: string = '';
  pageIndex: number = 0;
  pageSize: number = 12;
  totalTransactions: number = 0;
  searchKeyword: string = '';

  constructor(private userService: UserControllerService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.userService.getTransactionsByUser({
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

  downloadTransactions(): void {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Add Title
    doc.setFontSize(18);
    doc.text('Transaction Statement', 105, 20, { align: 'center' });

    // Add Date
    doc.setFontSize(12);
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 14, 30);

    // Add Table Header
    const startY = 40;
    const rowHeight = 10;
    let y = startY;
    const headers = ['Transaction Id', 'Amount', 'Description', 'Date', 'Type'];

    doc.setFontSize(10);
    doc.setFillColor(200, 200, 200);
    doc.rect(14, y, 182, rowHeight, 'F');
    doc.setTextColor(0);
    headers.forEach((header, i) => {
      doc.text(header, 15 + i * 36, y + 6);
    });

    y += rowHeight;

    // Add Transactions
    if (this.transaction && this.transaction.content.length > 0) {
      this.transaction.content.forEach(trans => {
        if (y > 280) { // Create a new page if y exceeds page height
          doc.addPage();
          y = 20;
        }

        doc.setTextColor(0);
        doc.text(trans.id.toString(), 15, y + 6);
        doc.text(trans.amount.toString() + ' TND', 51, y + 6);

        // Wrap description text if it's too long
        const descLines = doc.splitTextToSize(trans.description, 36); // Max width for description
        descLines.forEach((line, index) => {
          if (index > 0) y += rowHeight; // Increase y position for new line
          doc.text(line, 87, y + 6);
        });

        doc.text(new Date(trans.date).toLocaleDateString(), 123, y + 6);
        doc.text(trans.transactionType.replace('_', ' ').toLowerCase(), 159, y + 6);

        y += rowHeight;
      });
    } else {
      doc.text('No transactions found', 105, y + 6, { align: 'center' });
    }

    doc.save('transactions.pdf');
  }

}
