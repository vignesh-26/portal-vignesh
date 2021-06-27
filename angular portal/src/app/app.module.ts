import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './navbar/header.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { SaleorderComponent } from './saleorder/saleorder.component';
import {MatTableModule} from '@angular/material/table';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    HeaderComponent,
    EditprofileComponent,
    SaleorderComponent,
    MydashboardComponent,
    InvoiceComponent
    
  ],
  imports:
    [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FlexLayoutModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      FormsModule,
      HttpClientModule,
      NgbModule,
      MatSidenavModule,
      MatExpansionModule,
      MatTableModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
