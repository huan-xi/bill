import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CookieService } from 'ngx-cookie-service';
import {HttpModule} from "@angular/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddPage} from "../pages/add/add";
import {DetailPage} from "../pages/detail/detail";
import {LoginPage} from "../pages/login/login";
import {BillService} from "../providers/BillService/BillService";
import {TypePipe} from "../pipes/type/type";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    LoginPage,
    TypePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'返回',
      iconMode:'ios',
      mode: 'ios',//样式强制使用ios样式
    }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BillService,
    CookieService
  ]
})
export class AppModule {}
