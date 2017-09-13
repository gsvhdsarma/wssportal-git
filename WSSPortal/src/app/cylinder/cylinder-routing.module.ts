import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CylinderComponent } from './cylinder/cylinder.component';
import { CylinderDetailComponent } from './cylinderdetail/cylinderdetail.component';

const routes: Routes = [
  {
    path: '',
    component: CylinderComponent,
    children: [
      {
        path: 'Cylinder',
        component: CylinderComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CylinderRoutingModule { }
