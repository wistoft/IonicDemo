import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Media } from '@ionic-native/media';
import { Market } from '@ionic-native/market';

import { MyApp } from './app.component';
import { UtilService } from '../services/app.util.service';

import { LoginPage } from '../pages/login/login';
import { CameraPage } from '../pages/camera/camera';
import { PlayAudioAssetPage } from '../pages/play-audio-asset/play-audio-asset';
import { UtilPage } from '../pages/util/util';

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		CameraPage,
		PlayAudioAssetPage,
		UtilPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage,
		CameraPage,
		PlayAudioAssetPage,
		UtilPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		File,
		Camera,
		Media,
		Market,
		UtilService,
	]
})
export class AppModule {}
