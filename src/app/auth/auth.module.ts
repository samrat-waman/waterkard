import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DriverLoginComponent } from "../auth/driver-login/driver-login.component";
import { VendorLoginComponent } from "./vendor-login/vendor-login.component";
import { IonicModule } from "@ionic/angular";
import { RegisterComponent } from "./register/register.component";

@NgModule({
	declarations: [VendorLoginComponent, DriverLoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		IonicModule,
	],
})
export class AuthModule {}
