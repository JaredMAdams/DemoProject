import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from 'src/app/components/employee-list/employee-list.component';


const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: EmployeeListComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
