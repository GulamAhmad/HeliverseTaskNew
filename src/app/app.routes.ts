import { Routes } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';

export const routes: Routes = [
    {path:"**",component: PaginationComponent, pathMatch: "full"}
]
