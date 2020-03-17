import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() createServer: EventEmitter<any> = new EventEmitter();
  @Output() createBluePrint: EventEmitter<any> = new EventEmitter();

  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverNameInput', { static: true }) serverNameInput: ElementRef
  @ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef
  constructor() { }

  ngOnInit(): void {
    // console.log(this.serverNameInput)
  }

  onAddServer() {
    // console.log(this.serverNameInput)
    // this.serverElements.push({
    //   type: 'server',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
    // this.createServer.emit({ serverName: this.newServerName, serverContent: this.newServerContent });
    this.createServer.emit({ serverName: this.serverNameInput.nativeElement.value, serverContent: this.serverContentInput.nativeElement.value });
  }

  onAddBlueprint() {
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
    this.createBluePrint.emit({ serverName: this.serverNameInput.nativeElement.value, serverContent: this.serverContentInput.nativeElement.value });
  }
}
