import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { ReportComponent } from "./report/report.component";

const routes: Routes = [
	{
		path: "",
		component: ReportComponent,
	},
	{
		path: 'payment-report',
		component: PaymentReportComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReportRoutingModule { }
