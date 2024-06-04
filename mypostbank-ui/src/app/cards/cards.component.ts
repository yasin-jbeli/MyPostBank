import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CardControllerService } from "../services/services/card-controller.service";
import { UserControllerService } from "../services/services/user-controller.service";
import { CardDto } from "../services/models/card-dto";
import { UserDetailsDto } from "../services/models/user-details-dto";
import { PageResponseTransactionDto } from "../services/models/page-response-transaction-dto";
import { TransactionDto } from "../services/models/transaction-dto";
import { Router } from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cards: CardDto[];
  user: UserDetailsDto;
  transaction: TransactionDto[];
  selectedCard: any = null;

  constructor(
    private cardService: CardControllerService,
    private userService: UserControllerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCards();
    this.loadUser();
  }

  loadCards() {
    this.cardService.getUserCards().subscribe({
      next: (res: CardDto[]) => {
        this.cards = res;
        if (this.cards.length === 0) {
          this.router.navigate(['/card-request']);
        }
      },
      error: (error) => {
        console.error('Error loading cards:', error);
      }
    });
  }

  private loadUser() {
    this.userService.getUserDetails().subscribe({
      next: (res: UserDetailsDto) => { this.user = res; }
    });
  }

  private loadTransactions(selectedCard) {
    this.selectedCard = selectedCard;
    this.userService.getTrans().subscribe({
      next: (response: TransactionDto[]) => {
        this.transaction = response.filter(trans => trans.transactionType === 'CARD_PAYMENT');
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  showCardInfo(card: any) {
    this.selectedCard = card;
    this.loadTransactions(this.selectedCard);
  }

  deactivate(cardId: number) {
    if (confirm('Are you sure you want to deactivate this card?')) {
      const requestParams = {
        cardId: cardId
      };
      this.cardService.deactivateCard(requestParams).subscribe(
        () => {
          console.log('Card deactivated successfully');
        },
        error => {
          console.error('Error deactivating card:', error);
        }
      );
      this.snackBar.open('Deactivating card...', 'Dismiss', {
        duration: 3000,
        panelClass: ['my-snackbar']
      });
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  activate(cardId: number) {
    if (confirm('Are you sure you want to activate this card?')) {
      const requestParams = {
        cardId: cardId
      };
      this.cardService.activateCard(requestParams).subscribe(
        () => {
          console.log('Card activated successfully');
        },
        error => {
          console.error('Error activating card:', error);
        }
      );
      this.snackBar.open('Activating card...', 'Dismiss', {
        duration: 3000,
        panelClass: ['my-snackbar']
      });
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }


  delete(cardId: number) {
    const requestParams = {
      cardId: cardId
    };

    if (confirm('Are you sure you want to delete this card?')) {
      this.cardService.cancelCardRequest(requestParams).subscribe(
        () => {
          this.loadCards();
        },
        (error) => {
          console.error('Error deleting card:', error);
        }
      );

      this.snackBar.open('Deleting card...', 'Dismiss', {
        duration: 3000,
        panelClass: ['my-snackbar']
      });
    }
  }

  trans() {
    this.router.navigate(['user/transactions']);
  }
}
