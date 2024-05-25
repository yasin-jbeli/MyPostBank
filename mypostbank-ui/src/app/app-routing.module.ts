import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransferComponent } from './transfer/transfer.component';
import { CheckbooksComponent } from './checkbooks/checkbooks.component';
import { authGuard } from './services/guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { CardsComponent } from "./cards/cards.component";
import {AccountsComponent} from "./account/accounts.component";
import {CreditComponent} from "./credit/credit.component";
import {LoansComponent} from "./loans/loans.component";
import {OpenAccountComponent} from "./open-account/open-account.component";
import {ProfileComponent} from "./profile/profile.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminTransactionsComponent} from "./admin-transactions/admin-transactions.component";
import {AdminCreditComponent} from "./admin-credit/admin-credit.component";
import {AdminAccountsComponent} from "./admin-accounts/admin-accounts.component";
import {AdminCardsComponent} from "./admin-cards/admin-cards.component";
import {AdminCheckbooksComponent} from "./admin-checkbooks/admin-checkbooks.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: AdminComponent,
    children: [
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'transactions', component: AdminTransactionsComponent},
      {path: 'credit', component: AdminCreditComponent},
      {path: 'accounts', component: AdminAccountsComponent},
      {path: 'cards', component: AdminCardsComponent},
      {path: 'checkbooks', component: AdminCheckbooksComponent},
      {path: 'users', component: UsersComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
  {
    path: 'user',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'checkbooks', component: CheckbooksComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'request-loan', component: CreditComponent },
      { path: 'loans', component: LoansComponent},
      { path: 'open-account', component: OpenAccountComponent},
      { path: 'profile', component: ProfileComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
