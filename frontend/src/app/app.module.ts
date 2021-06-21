import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ColorPickerModule } from 'ngx-color-picker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';

import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';
import { DrawingToolboxComponent } from './components/drawing-toolbox/drawing-toolbox.component';
import { DrawingToolComponent } from './components/drawing-tool/drawing-tool.component';
import { DocumentComponent } from './components/document/document.component';

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
    DrawingToolComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
