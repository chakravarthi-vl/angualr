import {Injectable} from '@angular/core';
import {ProductBackendService} from "./backend/product-backend.service";
import {Observable} from "rxjs";
import {Product} from "../../store/products/product.model";
import {tap} from "rxjs/operators";
import {MESSAGES} from "../../enums/messages";
import {HttpErrorResponse} from "@angular/common/http";
import {SnackbarService} from "../snackbar/snackbar.service";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly backendService: ProductBackendService,
              private snackbarService: SnackbarService) {
  }

  getProducts = (): Observable<Product[]> => {
    return this.backendService.getProducts().pipe(
      tap((product) => {
        this.snackbarService.openSnackBar(MESSAGES.LOAD_PRODUCT_SUCCESS, false, 5000);
      }, (err: HttpErrorResponse) => {
        let message = 'Es gab probleme beim laden der Produkte';
        this.snackbarService.openSnackBar(message, true, 0)
      })
    );
  }
  getProductByCode = (code: string): Observable<Product[]> => {
    return this.backendService.getProductByCode(code);
  }

  createProduct = (product: Product): Observable<Product> => {
    return this.backendService.createProduct(product);
  }

  updateProduct = (product: Product): Observable<Product> => {
    return this.backendService.updateProduct(product);
  }
}
