import { NgModule } from '@angular/core';
import { Routes, RouterModule,ExtraOptions } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { EducatorComponent } from './educator/educator.component';
import { ParentComponent } from './parent/parent.component';
import { UpdateStudentProfileComponent } from './update-student-profile/update-student-profile.component';
import { UpdateEducatorProfileComponent } from './update-educator-profile/update-educator-profile.component';
import { ManageEducatorComponent } from './manage-educator/manage-educator.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { MapEducatorComponent } from './map-educator/map-educator.component';


const routes: Routes = [
  {path:'auth',component:AuthComponent,children:[
    {path:'',component:LoginComponent},
    {path:'forget-password',component:ForgetPasswordComponent},
  ]},
  {path:'coordinator',component:CoordinatorComponent,children:[
    {path:'manage-educator',component:ManageEducatorComponent},
    {path:'manage-student',component:ManageStudentComponent},
    {path:'update-student/:uid',component:UpdateStudentProfileComponent},
    {path:'update-educator/:uid',component:UpdateEducatorProfileComponent},
    {path:'map-educator/:sid',component:MapEducatorComponent}
  ]},
  {path:'educator',component:EducatorComponent,children:[
    {path:'update-student/:uid',component:UpdateStudentProfileComponent},
    {path:'update-educator/:uid',component:UpdateEducatorProfileComponent},
    {path:'manage-student/:uid',component:ManageStudentComponent}
  ]},
  {path:'parent',component:ParentComponent,children:[
    {path:'update-student/:uid',component:UpdateStudentProfileComponent}
  ]},
  {path:'**',redirectTo:'auth', pathMatch:"full"}

];

const config: ExtraOptions = {
  useHash: false,
};


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
