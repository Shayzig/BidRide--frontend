import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarPageComponent } from './pages/car-page/car-page.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './cmps/about/about.component';
import { CarDetailsComponent } from './cmps/car-details/car-details.component';
import { CarEditPageComponent } from './pages/car-edit-page/car-edit-page.component';
import { authGuard } from './guards/auth.guard';
import { carResolver } from './resolvers/car.resolver';
import { LoginSignupComponent } from './cmps/login-signup/login-signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginSignupComponent },
  {
    path: 'car', component: CarPageComponent, children: [
      {
        path: 'car/:id', component: CarDetailsComponent,
        canActivate: [authGuard],
        resolve: { car: carResolver }
      },

      {
        path: 'edit', component: CarEditPageComponent, canActivate: [authGuard]
      },
      {
        path: 'edit/:id', component: CarEditPageComponent, canActivate: [authGuard],
        resolve: { car: carResolver }
      },
    ]
  },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
