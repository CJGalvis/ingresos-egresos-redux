import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const dashboardChildrenRouter: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(dashboardChildrenRouter)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
