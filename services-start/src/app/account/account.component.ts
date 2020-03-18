import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent implements OnInit {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accountService: AccountService) {
    this.accountService.statusUpdated.subscribe((re) => {
      console.log('aaaaaaaaaa');
    })
  }

  ngOnInit() {
 
  }
  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    this.accountService.onUpdateAccount(this.id, status)
    // this.loggingService.logStatusChange(status);
  }
}
