import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  selector: 'push-notification',
  templateUrl: 'push-notification.html',
})
export class PushNotificationPage {
	
	
	//https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/INSTALLATION.md
	// 1. download google-services.js from firebase (settings > project settings)
	// 2. place google-services.js in app root
	// 3. update config.xml > platform[name=android ] with:  <resource-file src="google-services.json" target="google-services.json" />
	
	//setup client
	// 1. get server key from firebase (settings > project settings > cloud messaging)
	// 1. init on client
	// 2. copy registration key from client to server.
	// 3. use node package: fcm-push
	
	//protocol documentation
	//https://firebase.google.com/docs/cloud-messaging/server
	
	//client documentation
	//https://github.com/phonegap/phonegap-plugin-push/tree/master/docs
	
	//payload
	//https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md

//viewproperties

	private permissionMessage = "Permission unknown";			// tslint:disable-line
	private regId = "Unknown";									// tslint:disable-line

//more

	
	private pushObject: PushObject;

	constructor	( private platform: Platform
				, private push: Push
				) {
					

		this.platform.ready().then(() => {
			
			
			// to check if we have permission
			this.push.hasPermission()
				.then((res: any) => {
					
					if (res.isEnabled) {
						this.permissionMessage = "Permission to push.";
						console.log('We have permission to send push notifications');
					} else {
						this.permissionMessage = "Permission denied.";
						console.log('We do not have permission to send push notifications');
					}

				});
				
			//init

				const options: PushOptions = {
						android: {
						},
						browser: {
							pushServiceURL: 'http://push.api.phonegap.com/v1/push'
						},
						ios: {
							alert: 'true',
							badge: true,
							sound: 'false'
						},
						windows: {},
				};

				this.pushObject = this.push.init(options);

				//console.log(this.pushObject);

				this.pushObject.on('registration').subscribe((registration: any) => {

					this.regId = registration.registrationId;
					
					console.log('Device registered', registration);
					console.log("registrationType: " + registration.registrationType);
					
					console.log("");
					console.log(registration.registrationId);
					console.log("");
					
				});
				

				this.pushObject.on('notification').subscribe((data: any) => {
					console.log(data.title);
					console.log(data.message);
					console.log(data.count);	//the badge number
					
					//This needs to be done, when the app is in foreground. Only done automatically, when in background.
					
					if (data.count){
						this.pushObject.setApplicationIconBadgeNumber(data.count);
					}
					
				});

				this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


		});
	}
	

	onSetBadge(i : number) {
		this.pushObject.setApplicationIconBadgeNumber(i);
	}


}
