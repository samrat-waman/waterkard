import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DispensersRoutingModule } from "./dispensers-routing.module";
import { DispencersListComponent } from "./dispencers-list/dispencers-list.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { AddDisepensersComponent } from "./add-disepensers/add-disepensers.component";

@NgModule({
	declarations: [DispencersListComponent, AddDisepensersComponent],
	imports: [CommonModule, DispensersRoutingModule, IonicModule, FormsModule],
})
export class DispensersModule {}
