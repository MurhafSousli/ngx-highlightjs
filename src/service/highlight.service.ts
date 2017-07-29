import { Injectable } from '@angular/core';

@Injectable()
export class HighlightService {

  constructor(public theme = 'github',
              public path = 'assets/lib/hljs') {
  }

}
