import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeInputModule } from 'angular-code-input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { AppRoutingModule } from './app-routing.module';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransferComponent } from './transfer/transfer.component';
import { CheckbooksComponent } from './checkbooks/checkbooks.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CardsComponent } from "./cards/cards.component";
import { AccountsComponent } from "./account/accounts.component";
import { OpenAccountComponent } from "./open-account/open-account.component";
import { LoansComponent } from "./loans/loans.component";
import { CreditComponent } from "./credit/credit.component";
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAccountsComponent } from './admin-accounts/admin-accounts.component';
import { AdminCardsComponent } from './admin-cards/admin-cards.component';
import { AdminTransactionsComponent } from './admin-transactions/admin-transactions.component';
import { AdminCreditComponent } from './admin-credit/admin-credit.component';
import { AdminCheckbooksComponent } from './admin-checkbooks/admin-checkbooks.component';
import {ProfileComponent} from "./profile/profile.component";
import { UsersComponent } from './users/users.component';
import {NgOptimizedImage} from "@angular/common";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransactionsComponent,
    TransferComponent,
    CheckbooksComponent,
    ActivateAccountComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    CardsComponent,
    AccountsComponent,
    OpenAccountComponent,
    CreditComponent,
    LoansComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminAccountsComponent,
    AdminCardsComponent,
    AdminTransactionsComponent,
    AdminCreditComponent,
    AdminCheckbooksComponent,

    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule,
    MatPaginatorModule,
    RouterModule,
    AppRoutingModule,
    MatSnackBarModule,
    NgOptimizedImage,
    MatSelectModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
