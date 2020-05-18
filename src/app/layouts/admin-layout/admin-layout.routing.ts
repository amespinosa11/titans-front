import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProgresoEstrategiaComponent } from 'src/app/pages/progreso-estrategia/progreso-estrategia.component';
import { ResultadosPruebaComponent } from 'src/app/pages/resultados-prueba/resultados-prueba.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'progreso/:idEstrategia', component: ProgresoEstrategiaComponent },
    { path: 'resumen/:idEstrategia', component: ResultadosPruebaComponent }
];
