import { Component, OnInit } from '@angular/core';
import { AccountService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AccountService]
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) { }
  accounts: { name: string, status: string }[] = [];

  ngOnInit() {
    this.accounts = this.accountService.accounts;
  }
}
