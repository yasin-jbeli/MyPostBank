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
import { TokenService } from "../services/token/token.service";

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
    private cardService: CardControllerService,
    private tokenService: TokenService
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
    if (confirm('Are you sure you want to update your profile?')) {
      this.updateProfileError = null;
      const userData: User = {};

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
  }

  changePassword() {
    if (confirm('Are you sure you want to change your password?')) {
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

  del() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteUser().subscribe(() => {
        this.tokenService.logout();
        alert('Your account has been deleted. You will be logged out now.');
      }, error => {
        console.error('Error deleting the user:', error);
        alert('There was an error deleting your account. Please try again later.');
      });
    }
  }
}
