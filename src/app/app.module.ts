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
import { FilePage } from '../pages/file/file';
import { CameraPage } from '../pages/camera/camera';
import { ImagePage } from '../pages/image/image';
import { PlayAudioAssetPage } from '../pages/play-audio-asset/play-audio-asset';
import { RecordAudioPage } from '../pages/record-audio/record-audio';
import { UtilPage } from '../pages/util/util';

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		FilePage,
		CameraPage,
		ImagePage,
		PlayAudioAssetPage,
		RecordAudioPage,
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
		FilePage,
		CameraPage,
		ImagePage,
		PlayAudioAssetPage,
		RecordAudioPage,
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
