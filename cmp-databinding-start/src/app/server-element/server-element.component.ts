import { Component, OnInit, Input, AfterContentInit, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, AfterContentInit {
  @Input('srvElement') element: { name: string, content: string, type: string };
  @ContentChild('serverContent', {static: true}) serverContent: ElementRef;
  constructor() { }

  ngOnInit(): void {
    console.log(this.serverContent.nativeElement);
  }

  ngAfterContentInit() {
    console.log('After content init');
    console.log(this.serverContent.nativeElement);
  }

}
