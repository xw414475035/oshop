import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from '../../../../node_modules/rxjs';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCatrgories();
// get product id  and subscribe it, take is a way to subscribe one thing and then unsubscribe
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { this.productService.getById(id).valueChanges().take(1).subscribe(p => this.product = p); }
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }

}
