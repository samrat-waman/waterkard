import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportRoutingModule } from "./report-routing.module";
import { ReportComponent } from "./report/report.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { PaymentReportComponent } from './payment-report/payment-report.component';

@NgModule({
	declarations: [ReportComponent, PaymentReportComponent],
	imports: [CommonModule, ReportRoutingModule, IonicModule, FormsModule],
})
export class ReportModule { }
