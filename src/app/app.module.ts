import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { EducatorComponent } from './educator/educator.component';
import { ParentComponent } from './parent/parent.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageEducatorComponent } from './manage-educator/manage-educator.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { UpdateStudentProfileComponent } from './update-student-profile/update-student-profile.component';
import { UpdateEducatorProfileComponent } from './update-educator-profile/update-educator-profile.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MapEducatorComponent } from './map-educator/map-educator.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    ForgetPasswordComponent,
    CoordinatorComponent,
    EducatorComponent,
    ParentComponent,
    ManageEducatorComponent,
    ManageStudentComponent,
    UpdateStudentProfileComponent,
    UpdateEducatorProfileComponent,
    MapEducatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    AngularFireStorageModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
