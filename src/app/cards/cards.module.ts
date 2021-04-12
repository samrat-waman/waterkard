import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardListComponent } from "../cards/card-list/card-list.component";
import { CardsRoutingModule } from "./cards-routing.module";
import { IonicModule } from "@ionic/angular";
import { CardEditComponent } from "./card-edit/card-edit.component";
import { FormsModule } from "@angular/forms";
@NgModule({
	declarations: [CardListComponent, CardEditComponent],
	imports: [CommonModule, CardsRoutingModule, IonicModule, FormsModule],
})
export class CardsModule {}
