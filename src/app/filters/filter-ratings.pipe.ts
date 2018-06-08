import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRatings'
})
export class FilterRatingsPipe implements PipeTransform {

  transform(items: any, option?: any): any {
    return option ? option === 'All' ? items : items.filter(item => item.rating === option) : items;
  }

}
