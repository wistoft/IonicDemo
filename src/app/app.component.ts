import firebase from 'firebase';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { FilePage } from '../pages/file/file';
import { CameraPage } from '../pages/camera/camera';
import { ImagePage } from '../pages/image/image';
import { PlayAudioAssetPage } from '../pages/play-audio-asset/play-audio-asset';
import { RecordAudioPage } from '../pages/record-audio/record-audio';
import { PushNotificationPage } from '../pages/push-notification/push-notification';
import { PermissionsPage } from '../pages/permissions/permissions';
import { UtilPage } from '../pages/util/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = LoginPage;

	pages: Array<{title: string, component: any}>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		
		//init firebase
	
			firebase.initializeApp({
				apiKey: "AIzaSyASwwTQDpoN1C8YOk_0D7w8XfEmqb87x9U",
				authDomain: "ionicdemo-2c5fb.firebaseapp.com",
			});
			
		//on platform ready
			
			this.platform.ready().then(() => {
				
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
				this.statusBar.styleDefault();
				this.splashScreen.hide();
				
				console.log("ready");
				
			});

		// used for an example of ngFor and navigation
			
			this.pages = [
				{ title: 'Login'				, component: LoginPage },
				{ title: 'Files'				, component: FilePage },
				{ title: 'Camera'		      	, component: CameraPage },
				{ title: 'Images'				, component: ImagePage },
				{ title: 'Play Audio Asset'		, component: PlayAudioAssetPage },
				{ title: 'Record Audio'			, component: RecordAudioPage },
				{ title: 'Push Notification'	, component: PushNotificationPage },
				{ title: 'Permissions'			, component: PermissionsPage },
				{ title: 'Util'					, component: UtilPage },
			];

	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
