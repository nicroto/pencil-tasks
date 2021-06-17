import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ColorPickerModule } from 'ngx-color-picker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';

import { AuthService } from './shared/services/auth.service';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';
import { DrawingToolboxComponent } from './drawing-toolbox/drawing-toolbox.component';
import { DrawingToolComponent } from './drawing-tool/drawing-tool.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    HeaderComponent,
    LogoComponent,
    CustomButtonComponent,
    DrawingCanvasComponent,
    DrawingToolboxComponent,
    DrawingToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ColorPickerModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
