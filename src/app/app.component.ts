import { Purchase } from './../models/purchase.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListPurchase } from 'src/models/listpurchase.model';
import { EventListForm } from 'src/models/event-list-form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mode = 'addList';
  public purchases: Purchase[] = [];
  public title: string ="O QUE COMPRAR?";
  public form: FormGroup;
  public dataList:ListPurchase[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      item: ['',Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(70),
          Validators.required
        ])]
    });
    this.load();
  }

  add(){
    const item = this.form.controls['item'].value;
    const id = this.purchases.length+1;
    this.purchases.push(new Purchase(
      id,item,false
    ));
    this.save();
    this.clear();
    this.changeMode('list');
  }

  clear(){
    this.form.reset();
  }

  remove(purchase: Purchase){
    const index = this.purchases.indexOf(purchase);
    if(index !== -1){
      this.purchases.splice(index,1);
    }
    this.save();
  }

  changeDone(eventListForm: EventListForm){
    const isChecked = (eventListForm.event.target as HTMLInputElement).checked;
    eventListForm.item.done = (isChecked) ? isChecked : false;
    if (eventListForm.item.done){
      const index = this.purchases.findIndex(x=>x.id == eventListForm.item.id);
      if(index === -1){
        this.purchases.push(new Purchase(
          eventListForm.item.id,eventListForm.item.item,false
        ));
        this.save();
      }
    }else {
      this.purchases = this.purchases.filter(x => x.id !== eventListForm.item.id);
      this.save();
      eventListForm.item.done = false;
    }
  }

  markAsDone(purchase: Purchase){
    purchase.done = true;
    this.save();
  }

  markAsUndone(purchase: Purchase){
    purchase.done =false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.purchases);
    localStorage.setItem('purchases',data);
  }

  load(){
    const dataList = require("./data.json");
    if(dataList !== null)
      {
        this.dataList = dataList;
      }


    const data = localStorage.getItem('purchases');
    if(data !== null)
      this.purchases = JSON.parse(data);
      else
      this.purchases = [];
    
  }

  changeMode(modo: string){
    this.mode = modo;
  }

  deleteAll(){
    this.purchases = [];
    this.save();
    this.changeMode('addList')
  }

}
