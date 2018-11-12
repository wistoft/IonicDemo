import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'permissions',
  templateUrl: 'permissions.html',
})
export class PermissionsPage {

	public readyMessage = "Not Ready (event hasn't fires)";

//runtime permissions
	
	public perms = ["CAMERA", "RECORD_AUDIO", "WRITE_EXTERNAL_STORAGE", "READ_EXTERNAL_STORAGE", "CALL_PHONE", "SEND_SMS"];
	
	public permsStatus : {[thisKeyWordIsNotUsedForAnything: string] : string} = {};

//permissions

	public cameraPermission : string;
	public microphonePermission : string;
	public storagePermission : string;
	public pushPermission : string;


	constructor	( private platform: Platform
				, private diagnostic: Diagnostic
				) {

		//initalize permission status

			for (const perm of this.perms){
				this.permsStatus[perm] = "Unknown";
			}
		
		//ready

			this.platform.ready().then(async () => {
				
					this.readyMessage = "Ready";

				//check all

					if (this.platform.is("android")){
						
						this.perms.forEach(async perm => {
							
							const status = this.diagnostic.getPermissionAuthorizationStatus(perm);

							this.permsStatus[perm] = await status;
						});

					}

				//check specific

					await this.onCheckCameraPermissions();
					await this.onCheckMicrophonePermissions();

					if (this.platform.is("android"))
						await this.onCheckStoragePermissions();

					if (this.platform.is("ios"))
						this.onCheckPushPermissions();
			});
	}

	async openSettings() {
		console.log("switchToSettings: " + await this.diagnostic.switchToSettings());
	}

	

//runtime

	async onRequestRuntimePermission(perm : string) {
		this.permsStatus[perm] = await this.diagnostic.requestRuntimePermission(perm);
	}
	
	//unused
	async onCheckAllPermissions() {

		for (const perm of this.perms){

			console.log(`${perm}: `	+ await this.diagnostic.getPermissionAuthorizationStatus(perm));
			
		}
	
	}


//camera

	async onCheckCameraPermissions() {
		console.log("Camera Present: "					+ await this.diagnostic.isCameraPresent());
		console.log("Camera Available: "				+ await this.diagnostic.isCameraAvailable());
		console.log("Camera Authorized: "				+ await this.diagnostic.isCameraAuthorized());
		console.log("Camera Auth Status: "				+ await this.diagnostic.getCameraAuthorizationStatus());

		if (this.platform.is("android"))
			console.log("Camera Auth Status (android): "	+ await this.diagnostic.getPermissionAuthorizationStatus("CAMERA"));

		this.cameraPermission = await this.diagnostic.getCameraAuthorizationStatus();
	}
	
	async requestCameraAuthorization() {
		this.cameraPermission = await this.diagnostic.requestCameraAuthorization();
		console.log("Camera Authorization: " + await this.diagnostic.requestCameraAuthorization());
	}
	
	//android only
	async requestCameraRuntimePermission() {
		this.cameraPermission = await this.diagnostic.requestRuntimePermission("CAMERA");
		//console.log("Camera Runtime Permission: " + await this.diagnostic.requestRuntimePermission("CAMERA"));
	}


//audio
	
	async onCheckMicrophonePermissions() {
		console.log("Microphone Authorized: "				+ await this.diagnostic.isMicrophoneAuthorized());
		console.log("Microphone Auth Status: "				+ await this.diagnostic.getMicrophoneAuthorizationStatus());

		if (this.platform.is("android"))
			console.log("Microphone Auth Status (android): "	+ await this.diagnostic.getPermissionAuthorizationStatus("RECORD_AUDIO"));
		
		this.microphonePermission = "" + await this.diagnostic.getMicrophoneAuthorizationStatus();
	}
	
	async requestMicrophoneAuthorization() {
		this.microphonePermission = await this.diagnostic.requestMicrophoneAuthorization();
		//console.log("Microphone Authorization: " + await this.diagnostic.requestMicrophoneAuthorization());
	}
	
	//android only
	async requestMicrophoneRuntimePermission() {
		this.microphonePermission = await this.diagnostic.requestRuntimePermission("RECORD_AUDIO");
		//console.log("Microphone Runtime Permission: " + await this.diagnostic.requestRuntimePermission("RECORD_AUDIO"));
	}	
	


//push
		
	async onCheckPushPermissions() {
		console.log("Push Enabled: "					+ await this.diagnostic.isRemoteNotificationsEnabled());

		//ios only
		console.log("Push Registered: "					+ await this.diagnostic.isRegisteredForRemoteNotifications());
		console.log("Push types: "						+ await this.diagnostic.getRemoteNotificationTypes());
		console.log("Push Auth Status: "				+ await this.diagnostic.getRemoteNotificationsAuthorizationStatus());
		
		this.pushPermission = "" + await this.diagnostic.isRemoteNotificationsEnabled();
	}

	//ios only
	async requestPushAuthorization() {
		//this.pushPermission = await cordova.plugins.diagnostic.requestRemoteNotificationsAuthorization();
	}




//storage (android only)
	
	async onCheckStoragePermissions() {
		console.log("Storage Authorized: "				+ await this.diagnostic.isExternalStorageAuthorized());
		console.log("Storage Auth Status: "				+ await this.diagnostic.getExternalStorageAuthorizationStatus());
		
		if (this.platform.is("android"))
			console.log("Storage Auth Status (android): "	+ await this.diagnostic.getPermissionAuthorizationStatus("WRITE_EXTERNAL_STORAGE"));
		
		this.storagePermission = "" + await this.diagnostic.getExternalStorageAuthorizationStatus();
	}
	
	async requestStorageAuthorization() {
		//console.log("Storage Authorization: " + await this.diagnostic.requestExternalStorageAuthorization());
		
		this.storagePermission = await this.diagnostic.requestExternalStorageAuthorization();
	}
	
	//android only
	async requestStorageRuntimePermission() {
		//console.log("Storage Runtime Permission: " + await this.diagnostic.requestRuntimePermission("WRITE_EXTERNAL_STORAGE"));
		
		this.storagePermission = await await this.diagnostic.requestRuntimePermission("WRITE_EXTERNAL_STORAGE");
	}

	
	


}
