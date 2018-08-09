import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {FooterComponent} from './footer/footer.component';
import {CoreModule} from '../core/core.module';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import {RouterModule} from '@angular/router';
import {Chatroom2Component} from './chatroom2/chatroom2.component';
import {FilterPipe} from './chatroom2/Filtermembre.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterPipeModule} from 'ngx-filter-pipe';
 
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule
  ],
  declarations: [LayoutComponent, AccueilComponent, FooterComponent, Chatroom2Component, FilterPipe],
  exports: [LayoutComponent]
})
export class AdminModule {
}