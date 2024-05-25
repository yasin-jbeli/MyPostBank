import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from "../services/token/token.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'] // Update the file extension if needed
})
export class LayoutComponent {
  accountsMenuVisible = false;
  creditMenuVisible = false;

  constructor(private router: Router, private tokenService: TokenService) {}

  toggleAccountsMenu() {
    this.accountsMenuVisible = !this.accountsMenuVisible;
  }

  toggleCreditMenu() {
    this.creditMenuVisible = !this.creditMenuVisible;
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
}
