import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventListForm } from 'src/models/event-list-form.model';
import { ListPurchase } from 'src/models/listpurchase.model';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html'
})
export class ListFormComponent implements OnInit {

  @Input() dataList!:ListPurchase[]
  @Input() title!: string;
  @Input() category!: string;
  @Input() pathImage!: string;
  @Output() changeDoneEvent = new EventEmitter<EventListForm>();

  constructor() { }

  ngOnInit(): void {
  }

  public emitEvent(item: ListPurchase, event: Event) {
    this.changeDoneEvent.emit(new EventListForm(item, event));
  }
}