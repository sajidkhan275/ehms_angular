import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { DeparmentComponent } from './Components/deparment/deparment.component';
import { HealthinfoComponent } from './Components/healthinfo/healthinfo.component';
import { EmployeeComponent } from './Components/employee/employee.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    {path:"department", component: DeparmentComponent, title: 'Department'},
    {path:"healthinfo", component: HealthinfoComponent, title: 'HealthInfp'},
    {path:"employee", component: EmployeeComponent, title: 'Employee'}
];

