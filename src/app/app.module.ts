import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Media } from '@ionic-native/media';

import { MyApp } from './app.component';

import { CameraPage } from '../pages/camera/camera';
import { PlayAudioAssetPage } from '../pages/play-audio-asset/play-audio-asset';

@NgModule({
	declarations: [
		MyApp,
		CameraPage,
		PlayAudioAssetPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		CameraPage,
		PlayAudioAssetPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		File,
		Camera,
		Media,
	]
})
export class AppModule {}
