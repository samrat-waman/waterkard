import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductRoutingModule } from "./product-routing.module";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { AddProductComponent } from "./add-product/add-product.component";

@NgModule({
	declarations: [ProductListComponent, AddProductComponent],
	imports: [CommonModule, ProductRoutingModule, IonicModule, FormsModule],
})
export class ProductModule {}
