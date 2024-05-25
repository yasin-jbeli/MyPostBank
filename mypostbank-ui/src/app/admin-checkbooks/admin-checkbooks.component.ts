import {Component, OnInit} from '@angular/core';
import {BankAccountDto} from "../services/models/bank-account-dto";
import {AdminControllerService} from "../services/services/admin-controller.service";
import {CheckbookDto} from "../services/models/checkbook-dto";
import {UpdateCheckbookStatus$Params} from "../services/fn/admin-controller/update-checkbook-status";

@Component({
  selector: 'app-admin-checkbooks',
  templateUrl: './admin-checkbooks.component.html',
  styleUrl: './admin-checkbooks.component.scss'
})
export class AdminCheckbooksComponent implements OnInit {
  checkbooks: CheckbookDto[];

  constructor(
    private adminService: AdminControllerService
  ) {
  }

  ngOnInit(): void {
    this.loadCheckbooks();
  }

  private loadCheckbooks() {
    this.adminService.checkbookRequests().subscribe({
      next: (res: CheckbookDto[]) => {
        this.checkbooks = res;
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  getAvailableStatuses(currentStatus: string): string[] {
    const allStatuses = ['ORDERED', 'BEING_DELIVERED', 'RECEIVED'];
    return allStatuses.filter(status => status !== currentStatus);
  }

  onStatusChange(checkId: number, newStatus: string): void {
    if (newStatus !== "ORDERED" && newStatus !== "BEING_DELIVERED" && newStatus !== "RECEIVED") {
      console.error('Invalid status:', newStatus);
      return;
    }

    if (confirm(`Are you sure you want to update status to ${newStatus}?`)) {
      const params: UpdateCheckbookStatus$Params = {
        checkId: checkId,
        checkbookStatus: newStatus as "ORDERED" | "BEING_DELIVERED" | "RECEIVED" // Type assertion
      };

      this.adminService.updateCheckbookStatus(params).subscribe({
        next: () => {
          const checkToUpdate = this.checkbooks.find(check => check.id === checkId);
          if (checkToUpdate) {
            checkToUpdate.status = newStatus;
          }
        },
        error: (error) => {
          console.error('Failed to update checkbook status:', error);
        }
      });
    }
  }
}


