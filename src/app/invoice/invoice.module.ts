import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { InvoiceRoutingModule } from "./invoice-routing.module";
import { InvoiceComponent } from "./invoice/invoice.component";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [InvoiceComponent],
	imports: [CommonModule, InvoiceRoutingModule, IonicModule, FormsModule],
})
export class InvoiceModule {}
