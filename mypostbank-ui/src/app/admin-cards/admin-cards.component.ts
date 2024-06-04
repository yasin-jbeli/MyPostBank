import {Component, OnInit} from '@angular/core';
import {AdminControllerService} from "../services/services/admin-controller.service";
import {CardDto} from "../services/models/card-dto";
import {BankAccountDto} from "../services/models/bank-account-dto";
import {CardControllerService} from "../services/services/card-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrl: './admin-cards.component.scss'
})
export class AdminCardsComponent implements OnInit{
   cards: CardDto[];
   requests: CardDto[];
  private snackBar: MatSnackBar;

  constructor(
    private adminService: AdminControllerService,
    private cardService: CardControllerService
  ) {
  }

  ngOnInit(): void {
    this.loadCards();
    this.loadRequests();
  }

  private loadCards() {
    this.adminService.getAllCards().subscribe({
      next: (res: CardDto[]) => {
        this.cards = res.filter(crd => !(crd.status === 'PENDING'));
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  private loadRequests() {
    this.adminService.getPendingCards().subscribe({
      next: (res: CardDto[]) => {
        this.requests = res;
      },
      error: (error) => {
        console.error('Error loading requests:', error);
      }
    });
  }

  delete(cardId: number) {
    const requestParams = {
      cardId: cardId
    };
    this.adminService.deleteCard1(requestParams).subscribe();
    this.loadCards();
  }

  rejectCard(id: any) {
    if (confirm('Are you sure you want to reject this card?')) {
      const requestParams = { cardId: id };
      this.adminService.rejectCard(requestParams).subscribe({
        next: () => {
          this.snackBar.open('Card rejected successfully', 'Dismiss', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error rejecting card:', error);
          this.snackBar.open('Error rejecting card', 'Dismiss', {
            duration: 3000
          });
        }
      });
    }
  }

  approveCard(id: any) {
    if (confirm('Are you sure you want to approve this card?')) {
      const requestParams = { cardId: id };
      this.adminService.approveCard(requestParams).subscribe({
        next: () => {
          this.snackBar.open('Card approved successfully', 'Dismiss', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error approving card:', error);
          this.snackBar.open('Error approving card', 'Dismiss', {
            duration: 3000
          });
        }
      });
    }
  }

  activate(id: number) {
    const requestParams = {
      cardId: id
    };
    this.adminService.activateCard1(requestParams).subscribe();
  }

  deactivate(id: number) {
    const requestParams = {
      cardId: id
    };
    this.adminService.deactivateCard1(requestParams).subscribe();
  }
}
