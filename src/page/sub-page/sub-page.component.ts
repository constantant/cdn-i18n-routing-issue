import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.css']
})
export class SubPageComponent {

  id$ = this.activatedRoute.params.pipe(map(({ id }) => id))

  constructor(private readonly activatedRoute: ActivatedRoute) {}

}
