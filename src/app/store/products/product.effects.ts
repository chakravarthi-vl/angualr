import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {loadProductFailure, loadProducts, loadProductsSuccess} from './product.actions';
import {ProductService} from "../../services/products/product.service";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectAllProducts} from "./product.selectors";


@Injectable()
export class ProductEffects {

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      withLatestFrom(this.store.pipe(select(selectAllProducts))),
      switchMap(() => this.productService.getProducts().pipe(
        map(products => loadProductsSuccess({data: products})),
        catchError(error => of(loadProductFailure({error}))))
      )
    );
  });


  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private store: Store
  ) {
  }

}
