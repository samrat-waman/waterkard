import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DepositeListComponent } from "./deposite-list/deposite-list.component";
import { DepositeRoutingModule } from "./deposite-routing.module";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { EditDepositeComponent } from "./edit-deposite/edit-deposite.component";

@NgModule({
	declarations: [DepositeListComponent, EditDepositeComponent],
	imports: [CommonModule, DepositeRoutingModule, IonicModule, FormsModule],
})
export class DepositeModule {}
