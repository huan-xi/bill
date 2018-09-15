import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TypePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string):string{
    return value=="0"?"支出":"收入";
  }
}
