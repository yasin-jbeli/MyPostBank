import {Component, OnInit} from '@angular/core';
import {CheckbookControllerService} from "../services/services/checkbook-controller.service";
import {CheckbookDto} from "../services/models/checkbook-dto";

@Component({
  selector: 'app-checkbooks',
  templateUrl: './checkbooks.component.html',
  styleUrl: './checkbooks.component.scss'
})
export class CheckbooksComponent implements OnInit{

  checkbooks: CheckbookDto[];

  constructor(
    private checkService: CheckbookControllerService
  ) {
  }

  ngOnInit(): void {
    this.loadCheckbooks();
  }

loadCheckbooks(): void {
    this.checkService.getCheckbookByUserId1().subscribe({
      next: (res: CheckbookDto[]) => {
        this.checkbooks = res;
      }
    });
}
}
