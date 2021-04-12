import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InventoryRoutingModule } from "./inventory-routing.module";
import { InventoryComponent } from "./inventory/inventory.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

@NgModule({
	declarations: [InventoryComponent, AddInventoryComponent],
	imports: [CommonModule, InventoryRoutingModule, IonicModule, FormsModule],
})
export class InventoryModule { }
