import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StatementRoutingModule } from "./statement-routing.module";
import { IonicModule } from "@ionic/angular";
import { StatementComponent } from "./statement/statement.component";

@NgModule({
	declarations: [StatementComponent],
	imports: [CommonModule, StatementRoutingModule, IonicModule],
})
export class StatementModule {}
