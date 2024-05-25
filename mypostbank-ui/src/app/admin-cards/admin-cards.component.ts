import {Component, OnInit} from '@angular/core';
import {AdminControllerService} from "../services/services/admin-controller.service";
import {CardDto} from "../services/models/card-dto";
import {BankAccountDto} from "../services/models/bank-account-dto";
import {CardControllerService} from "../services/services/card-controller.service";

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrl: './admin-cards.component.scss'
})
export class AdminCardsComponent implements OnInit{
   cards: CardDto[];
   requests: CardDto[];

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

  reject(id: any) {
    const requestParams = {
      cardId: id
    };
    this.adminService.rejectCard(requestParams).subscribe();
  }

  approve(id: any) {
    const requestParams = {
      cardId: id
    };
    this.adminService.approveCard(requestParams).subscribe();
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
