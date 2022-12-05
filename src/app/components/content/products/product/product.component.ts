import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Product} from "../../../../store/products/product.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {selectAllProducts} from "../../../../store/products/product.selectors";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() isUserInRoleProductManger!: boolean;
  @Input() createProduct!: boolean;

  @Output() disableProductCard = new EventEmitter<string>();

  disable = false;
  productFormGroup!: FormGroup;
  filteredCategories: Observable<string[]> | undefined;

  priceEuroFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,

  });

  constructor(private readonly formBuilder: FormBuilder,
              private readonly productStore: Store<Product>,) {
  }

  ngOnInit(): void {
    this.initializeProductFormGroup();
  }

  initializeProductFormGroup = (): FormGroup => {
    let product = this.product;

    return this.productFormGroup = this.formBuilder.group({
      name: new FormControl({
        value: this.getText(product.name),
        disabled: true
      }, []),

      description: new FormControl({
        value: this.getText(product.description),
        disabled: true

      }, []),
      priceAccording: new FormControl({
          value: this.getText(product.priceAccording),
          disabled: true
        },
        []),
      price: new FormControl({
        value: this.getFormttetPrice(product.price),
        disabled: true
      }, []),
      category: new FormControl({
        value: this.product ? this.product.category : null,
        disabled: true
      }, [])
    });
  }

  get controlName() {
    return (<FormControl>this.productFormGroup.get('name'));
  }

  get controlDescription() {
    return (<FormControl>this.productFormGroup.get('description'));
  }

  get controlPriceAccording() {
    return (<FormControl>this.productFormGroup.get('priceAccording'));
  }

  get controlPrice() {
    return (<FormControl>this.productFormGroup.get('price'));
  }

  get controlCategory() {
    return (<FormControl>this.productFormGroup.get('category'));
  }

  removeEmptyCard(value: string) {
    this.disableProductCard.emit(value);
  }

  private setFilteredCategories(): void {
    this.filteredCategories = this.productFormGroup.controls['category'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterCategory(value))
    );
  }

  private filterCategory(value: string): string[] {

    let categories: Array<string> = [];

    this.productStore.pipe(select(selectAllProducts)).subscribe(products => {
      products.forEach(e => {
        categories.push(e.category);
      })
    })

    return categories.filter(category => category.indexOf(value) === 0);
  }

  private getText = (text: string): string => {

    if (text) {
      return text;
    }
    return '';
  }


  //TODO: REFACTORING get 1.1 but need 1.00
  private getFormttetPrice = (price: number): string => {
    return this.priceEuroFormatter.format(price)
  }
}
