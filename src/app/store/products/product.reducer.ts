import {createReducer, on} from '@ngrx/store';
import {loadProductFailure, loadProducts, loadProductsSuccess} from './product.actions';
import {Product} from "./product.model";


export const productsFeatureKey = 'products';

export interface ProductState {
  products: Product[];
  loadingState: boolean;
}

export const initialState: ProductState = {
  products: [],
  loadingState: false
};

export const productReducer = createReducer(
  initialState,

  on(loadProducts, state => {
    return {...state, loadingState: true};
  }),

  on(loadProductsSuccess,
    (state, action) => {
      return {
        ...state,
        products: action.data,
        loadingState: false
      };
    }),

  on(loadProductFailure, (state) => {
    return {
      ...state, loadingState: false
    };
  }),
);



