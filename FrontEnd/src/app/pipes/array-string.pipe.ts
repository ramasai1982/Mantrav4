import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayString'
})
export class ArrayStringPipe implements PipeTransform {

  transform(input: Array<string>, sep=","): string {
    return input.toString();
  }

}
