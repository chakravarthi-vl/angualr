import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {ProductEffects} from './products/product.effects';
import * as fromProduct from './products/product.reducer';
import {productReducer} from './products/product.reducer';
import {StoreModule} from "@ngrx/store";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProduct.productsFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductModule {
}
