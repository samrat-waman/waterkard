import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderListComponent } from "./order-list/order-list.component";
import { IonicModule } from "@ionic/angular";
import { AddOrderComponent } from "./add-order/add-order.component";
import { FormsModule } from "@angular/forms";
import { PopoverPage } from "./order-list/order-popover";
import { OrderTypeComponent } from "./order-type/order-type.component";
import { ViewOrderComponent } from "./view-order/view-order.component";

@NgModule({
	declarations: [
		OrderListComponent,
		AddOrderComponent,
		PopoverPage,
		OrderTypeComponent,
		ViewOrderComponent,
	],
	imports: [CommonModule, OrderRoutingModule, IonicModule, FormsModule],
	entryComponents: [PopoverPage],
})
export class OrderModule {}
