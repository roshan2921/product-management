import { Component, OnInit } from '@angular/core';
import { Products } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  starRating: number=0
  pageTitle: string = 'productlist';
  showImage: boolean = false;
  imageShow: boolean = false;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredproducts = this.performFilter(value);
  }

  filteredproducts: Products[] = [];

  products: Products[] = [];

  performFilter(filterBy: string): Products[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Products) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.products = this.productService.getproducts();
    this.filteredproducts = this.products;
  }
  imageToggle() {
    this.imageShow = !this.imageShow;
  }
  starClicked(i: any) {
    this.starRating = i.starRating;
    console.log(this.starRating);
  }
}
