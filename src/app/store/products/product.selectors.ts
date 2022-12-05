import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProduct from './product.reducer';
import {ProductState} from './product.reducer';
import {Product} from "./product.model";

export const selectProducts = createFeatureSelector<ProductState>(fromProduct.productsFeatureKey);


export const selectProductsLoading = createSelector(selectProducts, ({loadingState}) => loadingState);
export const selectAllProducts = createSelector(selectProducts, ({products}) => products);
export const selectSingleProduct = (product: Product) => createSelector(selectProducts, (state: ProductState): Product => {

  let index = state.products.indexOf(product);
  return state.products[index];
});

