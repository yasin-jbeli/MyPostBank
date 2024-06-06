import { Component, OnInit } from '@angular/core';
import { AdminControllerService } from '../services/services/admin-controller.service';
import { UserDto } from '../services/models/user-dto';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserDto[];
  searchQuery: string;

  constructor(private adminService: AdminControllerService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  searchUsers(): void {
    if (!this.searchQuery) {
      this.loadUsers();
    } else {
      this.adminService.getAllUsers().subscribe({
        next: (res: UserDto[]) => {
          this.users = res.filter(user =>
            user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        },
        error: (error) => {
          console.error('Error loading users:', error);
        }
      });
    }
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (res: UserDto[]) => {
        this.users = res;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  delete(userId: number): void {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const requestParams = {userId: userId};
      this.adminService.deleteUser1(requestParams).subscribe({
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            this.loadUsers();
            this.snackBar.open('User deleted successfully', 'Dismiss', {
              panelClass: "my-snackbar",
              duration: 3000
            });
          } else {
            console.error('Error deleting user:', error);
            this.snackBar.open('User has active bank accounts.', 'Dismiss', {
              panelClass: "my-snackbar",
              duration: 3000
            });
          }
        }
      });
    }
  }
}
