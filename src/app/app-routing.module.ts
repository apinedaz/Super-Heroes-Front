import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroEditComponent } from './Page/hero-edit/hero-edit.component';
import { HeroFormComponent } from './Page/hero-form/hero-form.component';
import { HeroComponent } from './Page/hero/hero.component';

const routes: Routes = [
  { path: 'home', component: HeroComponent},
  { path: 'create', component:HeroFormComponent},
  { path: 'edit/:id', component:HeroEditComponent},
  { path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
