import { Component, EventEmitter, Output } from '@angular/core';
// import { LoggingService } from '../logging.service';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<any>();
  constructor(private accountService: AccountService) {
    
   }
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.onAddAccount(accountName, accountStatus);
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    this.accountService.statusUpdated.emit(status);
    console.log('A server status changed, new status: ' + accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
