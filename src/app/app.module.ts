import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroComponent } from './Page/hero/hero.component';
import { UppercaseNameDirective } from './Directive/uppercase-name.directive';
import { HeroFormComponent } from './Page/hero-form/hero-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    UppercaseNameDirective,
    HeroFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
