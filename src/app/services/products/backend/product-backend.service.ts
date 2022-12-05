import {Injectable} from '@angular/core';
import {Base} from "../../../base";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../../store/products/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductBackendService {

  url = `${Base.URL}products/`;

  constructor(private readonly http: HttpClient) {
  }

  getProducts = (): Observable<Product[]> => {
    return this.http.get<Product[]>(this.url)
  }
  getProductByCode = (code: string): Observable<Product[]> => {
    const url = `${this.url}code`
    return this.http.get<Product[]>(url);
  }

  createProduct = (product: Product): Observable<Product> => {
    const url = `${this.url}create`;
    return this.http.post<Product>(url, product);
  }

  updateProduct = (product: Product): Observable<Product> => {
    const url = `${this.url}edit`;
    return this.http.put<Product>(url, product);
  }

}
