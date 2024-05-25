import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../services/token/token.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(private router: Router, private tokenService: TokenService) {}

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
}
