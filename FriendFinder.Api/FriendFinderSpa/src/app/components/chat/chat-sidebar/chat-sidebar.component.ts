import { Component, OnInit, Input } from '@angular/core';
import { ChatGroup } from 'src/app/models/chat-group/chat-group';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html'
})
export class ChatSidebarComponent implements OnInit {

  constructor() { }

  @Input() chatGroups: ChatGroup[];

  ngOnInit() {
  }

}
