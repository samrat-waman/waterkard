import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DriverRoutingModule } from "./driver-routing.module";
import { IonicModule } from "@ionic/angular";
import { DriverListComponent } from "./driver-list/driver-list.component";
import { AddDriverComponent } from "./add-driver/add-driver.component";
import { FormsModule } from "@angular/forms";
@NgModule({
	declarations: [DriverListComponent, AddDriverComponent],
	imports: [CommonModule, DriverRoutingModule, IonicModule, FormsModule],
})
export class DriverModule {}
