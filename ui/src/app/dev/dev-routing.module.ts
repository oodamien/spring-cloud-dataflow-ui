import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/support/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const devRoutes: Routes = [
  {
    path: 'dev',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(devRoutes)],
  exports: [RouterModule]
})
export class DevRoutingModule {
}
