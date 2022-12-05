import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Product} from "../../../store/products/product.model";
import {Observable} from "rxjs";
import {selectAllProducts, selectProductsLoading} from "../../../store/products/product.selectors";
import {loadProducts} from "../../../store/products/product.actions";
import {KeycloakService} from "keycloak-angular";
import {ROLES} from "../../../enums/roles";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  loadingState = true;
  products!: Array<Product>;
  productsSlice!: Array<Product>;
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  isUserProductManager!: boolean;
  createProduct = false;

  constructor(private readonly productStore: Store<Product>,
              private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.isUserProductManager = this.isUserInRoleProductManger();
  }

  OnPageChanged = (event: PageEvent): void => {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.products.length) {
      endIndex = this.products.length;
    }
    this.productsSlice = this.products.slice(startIndex, endIndex);
  }


  private loadProducts = (): void => {

    this.loading$ = this.productStore.pipe(select(selectProductsLoading));


    this.products$ = this.productStore.pipe(select(selectAllProducts));

    this.productStore.dispatch(loadProducts());

    this.loading$.subscribe(loadingState => {
      this.loadingState = loadingState;
    })

    this.products$.subscribe(products => {
      this.products = products;
      this.productsSlice = this.products.slice(0, 20);
    })

  }

  isUserInRoleProductManger = (): boolean => {
    return this.keycloakService.getUserRoles().includes(ROLES.PRODUCT_MANAGER);
  }

  getEmptyProduct = () => {
    let product = {
      name: '',
      code: '',
      category: '',
      description: '',
      priceAccording: '',
      price: 0
    }

    return product;
  }

  disableEmptyCard(disable: string) {
    alert(disable);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
