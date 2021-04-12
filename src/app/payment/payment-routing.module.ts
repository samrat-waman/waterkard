import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";
import { PaymentComponent } from "./payment/payment.component";

const routes: Routes = [
	{
		path: "",
		component: PaymentComponent,
	},
	{
		path: "payment-history/:id",
		component: PaymentHistoryComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PaymentRoutingModule {}
