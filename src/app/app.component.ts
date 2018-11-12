import firebase from 'firebase';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { FilePage } from '../pages/file/file';
import { CameraPage } from '../pages/camera/camera';
import { PlayAudioAssetPage } from '../pages/play-audio-asset/play-audio-asset';
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
				
		// used for an example of ngFor and navigation

			this.pages = [
				{ title: 'Login'				, component: LoginPage },
				{ title: 'Files'				, component: FilePage },
				{ title: 'Camera'		      	, component: CameraPage },
				{ title: 'Play Audio Asset'		, component: PlayAudioAssetPage },
				{ title: 'Util'					, component: UtilPage },
			];

	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
