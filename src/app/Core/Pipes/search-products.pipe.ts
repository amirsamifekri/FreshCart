import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Interfaces/iproduct';

@Pipe({
  name: 'searchProducts',
  standalone: true,
})
export class SearchProductsPipe implements PipeTransform {
  transform(array: IProduct[], searchText: string): IProduct[] {
    return array.filter((ele) =>
      ele.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
