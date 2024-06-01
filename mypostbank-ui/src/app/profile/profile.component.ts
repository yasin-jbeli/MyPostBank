import { Component, OnInit } from '@angular/core';
import { BankAccountControllerService } from "../services/services/bank-account-controller.service";
import { UserDetailsDto } from "../services/models/user-details-dto";
import { UserControllerService } from "../services/services/user-controller.service";
import { CardControllerService } from "../services/services/card-controller.service";
import { BankAccountDto } from "../services/models/bank-account-dto";
import { CardDto } from "../services/models/card-dto";
import { UpdateUser$Params } from "../services/fn/user-controller/update-user";
import { User } from "../services/models/user";
import { ChangePassword$Params } from "../services/fn/user-controller/change-password";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: UserDetailsDto;
  accounts: BankAccountDto[];
  cards: CardDto[];
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };
  changePasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmationPassword: ''
  };
  updateProfileError: string | null = null;
  changePasswordError: string | null = null;

  constructor(
    private userService: UserControllerService,
    private accountService: BankAccountControllerService,
    private cardService: CardControllerService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadCards();
    this.loadAccounts();
  }

  loadUser(): void {
    this.userService.getUserDetails().subscribe({
      next: (res: UserDetailsDto) => {
        this.userInfo = res;
        this.user.firstName = res.firstName;
        this.user.lastName = res.lastName;
        this.user.email = res.email;
        this.user.phone = res.phone;
      },
      error: (error) => {
        this.updateProfileError = "Failed to load user details.";
      }
    });
  }

  private loadCards() {
    this.cardService.getUserCards().subscribe({
      next: (res: CardDto[]) => {
        this.cards = res.filter(crd => crd.status === 'ACTIVE');
      },
      error: (error) => {
        this.updateProfileError = "Failed to load user cards.";
      }
    });
  }

  private loadAccounts() {
    this.accountService.getUserAccounts().subscribe({
      next: (res: BankAccountDto[]) => {
        this.accounts = res.filter(acc => acc.status === 'ACTIVE');
      },
      error: (error) => {
        this.updateProfileError = "Failed to load user accounts.";
      }
    });
  }

  updateProfile() {
    this.updateProfileError = null;
    const userData: User = {};

    // Populate userData object with non-empty fields from this.user
    if (this.user.firstName.trim() !== '') {
      userData.firstName = this.user.firstName;
    }
    if (this.user.lastName.trim() !== '') {
      userData.lastName = this.user.lastName;
    }
    if (this.user.email.trim() !== '') {
      userData.email = this.user.email;
    }
    if (this.user.phone.trim() !== '') {
      userData.phone = this.user.phone;
    }

    if (Object.keys(userData).length > 0) {
      this.userService.updateUser({ body: userData } as UpdateUser$Params).subscribe(
        () => {
          console.log("Profile updated successfully");
        },
        (error) => {
          this.updateProfileError = "Failed to update profile.";
        }
      );
    }
  }

  changePassword() {
    this.changePasswordError = null;
    const changePasswordParams: ChangePassword$Params = {
      body: {
        currentPassword: this.changePasswordData.currentPassword,
        newPassword: this.changePasswordData.newPassword,
        confirmationPassword: this.changePasswordData.confirmationPassword
      }
    };

    this.userService.changePassword(changePasswordParams).subscribe(
      () => {
        console.log("Password changed successfully");
        // Clear the change password form after successful password change
        this.changePasswordData = {
          currentPassword: '',
          newPassword: '',
          confirmationPassword: ''
        };
      },
      (error) => {
        this.changePasswordError = "Failed to change password.";
      }
    );
  }
}
