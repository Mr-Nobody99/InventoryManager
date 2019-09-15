import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { INVENTORY } from '../inventory';
import { Ingredient } from '../ingredient';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  table = null;
  inventory = INVENTORY;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getTableData();
  }
  getTableData(){
    this.table = this.appService.getData('https://dev82960.service-now.com/api/now/v2/table/x_393226_inventory_ingredients?sysparm_fields=number%2Cname%2Cquantity');
    this.table.subscribe( (response) => {
      for(let item in response.result){
        let record = response.result[item];
        let ingredient = new Ingredient(record.number, record.name, record.quantity);
        INVENTORY.push(ingredient);
      }
      console.log(INVENTORY);
    });
  }
}
