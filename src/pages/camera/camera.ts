import { Component } from '@angular/core';

import { File, Entry } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
	selector: 'page-camera',
	templateUrl: 'camera.html'
})
export class CameraPage {

	viewImageUrl : string = "";
	
	constructor	( private camera: Camera
				, private file: File
				) {

	}

	//android
		
		//Photos taken are placed at
		// android: externalCacheDirectory
		//			 e.g.: file:///storage/emulated/0/Android/data/io.ionic.starter/cache/1535971982290.jpg
		// iPHone: tempDirectory
		//			 e.g.: file:///var/mobile/Containers/Data/Application/A11A3FEB-9006-443E-9F82-E579CFB2252D/tmp/cdv_photo_002.jpg 
		
		//Files chosen are placed at
		// android: content://com.android.providers.media.documents/document/image%3A1443
		// iPhone:  

		takePictureOrChooseImage(sourcetype) {
			
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: sourcetype
		}

		this.camera.getPicture(options).then((imageUrl) => {

			this.showPhoto(imageUrl);
			this.copyPhoto(imageUrl);

		})
		.catch((error) => {
						
			console.log("Failed to capture image: ", error);
	
		})
		;
	
	}
	
	takePicture() {
		this.takePictureOrChooseImage(this.camera.PictureSourceType.CAMERA);
	}
	
	takeChooseFromLibrary() {
		this.takePictureOrChooseImage(this.camera.PictureSourceType.PHOTOLIBRARY);
	}
	
	takeChooseFromAlbum() {
		this.takePictureOrChooseImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
	}	

	showPhoto(imageUrl :string) {
		
		const filepath = imageUrl.replace(/^(.*?)([^\\\/]*)$/, '$1');
		const filename = imageUrl.replace(/^(.*?)([^\\\/]*)$/, '$2');
		
		console.log("filename: " + filename);
		console.log("filepath: " + filepath);

		this.file.readAsDataURL(filepath, filename)
			.then((dataUrl : string) => {
				this.viewImageUrl = dataUrl;
			})
			.catch(error => {
				console.log("Error")
				console.log(JSON.stringify(error));
			});

	}	

	copyPhoto(imageUrl :string) {

			this.file.resolveLocalFilesystemUrl(imageUrl)
				.then((fileEntry : Entry) => {

					this.file.resolveDirectoryUrl(this.file.dataDirectory).then((targetFolder) => {

						console.log("copying");
						console.log("targetFolder", targetFolder);

						fileEntry.copyTo(targetFolder, "cameraImage.jpg", (fileEntry : Entry) => {

							console.log("fullPath: "			, fileEntry.fullPath);
							console.log("toURL() - " 			, fileEntry.toURL());
							console.log("toInternalURL() - " 	, fileEntry.toInternalURL());
							
						},(error) => {
							
							console.log("Error moving: ", error);
							
						});

					})

			
				})
				.catch((error) => {
						
					console.log("Error resolving: ", error);
			
				})
				;

	}

}
