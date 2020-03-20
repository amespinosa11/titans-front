import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule, MatIconModule} from '@angular/material';
import { EstrategiaDialogComponent } from 'src/app/pages/estrategia-dialog/estrategia-dialog.component';
import { ProgresoEstrategiaComponent } from 'src/app/pages/progreso-estrategia/progreso-estrategia.component';
import { ResultadosPruebaComponent } from 'src/app/pages/resultados-prueba/resultados-prueba.component';

const materialImports = [
  MatDialogModule,
  MatIconModule
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ...materialImports,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    EstrategiaDialogComponent,
    ProgresoEstrategiaComponent,
    ResultadosPruebaComponent
  ],
  exports: [
    ...materialImports,
  ],
  entryComponents: [
    EstrategiaDialogComponent
  ],
})

export class AdminLayoutModule {}
