import {createAction, props} from '@ngrx/store';

import {Product} from './product.model';
import {HttpErrorResponse} from "@angular/common/http";
import {Update} from "@ngrx/entity";

export const loadProducts = createAction(
  '[Product/API] Load Products',
);

export const loadProductsSuccess = createAction(
  '[Product/API] Load Product Success',
  props<{ data: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product/API] Load Product Failure',
  props<{ error: HttpErrorResponse }>()
);


export const addProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: Product }>()
);


export const updateProduct = createAction(
  '[Product/API] Update Product',
  props<{ product: Update<Product> }>()
);


export const deleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ code: string }>()
);
