import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PaymentRoutingModule } from "./payment-routing.module";

import { PaymentComponent } from "../payment/payment/payment.component";
import { IonicModule } from "@ionic/angular";
import { AddPaymentComponent } from "./add-payment/add-payment.component";
import { FormsModule } from "@angular/forms";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";
import { EditPaymentHistoryComponent } from "./edit-payment-history/edit-payment-history.component";
@NgModule({
	declarations: [
		PaymentComponent,
		AddPaymentComponent,
		PaymentHistoryComponent,
		EditPaymentHistoryComponent,
	],
	imports: [CommonModule, PaymentRoutingModule, IonicModule, FormsModule],
})
export class PaymentModule {}
