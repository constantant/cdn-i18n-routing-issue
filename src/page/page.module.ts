import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { SubPageComponent } from './sub-page/sub-page.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: ':id',
        component: SubPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PageComponent,
    SubPageComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class PageModule {}
