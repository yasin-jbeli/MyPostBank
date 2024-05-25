import { Component, OnInit } from '@angular/core';
import { CardControllerService } from "../services/services/card-controller.service";
import { UserControllerService } from "../services/services/user-controller.service";
import { CardDto } from "../services/models/card-dto";
import { UserDetailsDto } from "../services/models/user-details-dto";
import { PageResponseTransactionDto } from "../services/models/page-response-transaction-dto";
import { TransactionDto } from "../services/models/transaction-dto";
import { Router } from "@angular/router";

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
    private router: Router
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
    const requestParams = {
      cardId: cardId
    };
    this.cardService.deactivateCard(requestParams).subscribe();
  }

  activate(cardId: number) {
    const requestParams = {
      cardId: cardId
    };
    this.cardService.activateCard(requestParams).subscribe();
  }

  delete(cardId: number) {
    const requestParams = {
      cardId: cardId
    };
    this.cardService.deleteCard(requestParams).subscribe({
      next: () => {
        this.loadCards();
      },
      error: (error) => {
        console.error('Error deleting card:', error);
      }
    });
  }

  trans() {
    this.router.navigate(['user/transactions']);
  }
}
