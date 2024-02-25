import { Routes } from '@angular/router';
import { ActualizacionComponent } from '../post/actualizacion/actualizacion.component';
import { VistaIndividualComponent } from '../post/vista-individual/vista-individual.component';
import { CreacionComponent } from '../post/creacion/creacion.component';
import { ListadoComponent } from '../post/listado/listado.component';

export const routes: Routes = [
    {
        path: 'actualizacion/:id', 
        component: ActualizacionComponent
    },
    {
        path: 'vista/:id',
        component: VistaIndividualComponent
    },
    {
        path: 'creacion',
        component: CreacionComponent,
    },
    {
        path: '',
        component: ListadoComponent,
    }
];
