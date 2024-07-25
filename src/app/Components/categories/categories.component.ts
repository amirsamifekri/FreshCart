import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { ICategory } from '../../Core/Interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private _ProductsService = inject(ProductsService);
  categories: ICategory[] = [];

  //hooks
  ngOnInit(): void {
    this.getCategories();
  }

  // methods
  getCategories() {
    this._ProductsService.getCategories().subscribe({
      next: (value) => {
        this.categories = value.data;
      },
      error: (error) => console.error('Error:', error),
    });
  }
}
