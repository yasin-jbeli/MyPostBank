import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TokenService} from "./services/token/token.service";
import {Token} from "@angular/compiler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyPostBank';

}
