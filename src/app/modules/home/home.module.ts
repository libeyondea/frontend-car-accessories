import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from '~app/shared/layouts/hero/hero.component';

@NgModule({
	declarations: [HomeComponent, HeroComponent],
	imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
