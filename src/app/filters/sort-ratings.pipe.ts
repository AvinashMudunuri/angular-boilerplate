import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortRatings'
})
export class SortRatingsPipe implements PipeTransform {
  transform(items: any, sortBy?: any): any {
    return items.sort( (a, b) => {
      return sortBy ? (a.timeStamp > b.timeStamp ? -1
        : a.timeStamp < b.timeStamp ? 1 : 0)
        : (a.timeStamp < b.timeStamp ? -1
          : a.timeStamp > b.timeStamp ? 1 : 0);
    });
  }
}
