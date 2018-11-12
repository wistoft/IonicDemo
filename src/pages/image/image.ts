import { Component } from '@angular/core';

import { Platform, normalizeURL } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


type ImageDefinition =  { name: string
						, baseUrl: string
						, file: string
						};


@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {
	
	//view properties
		
		useReadAsDataURL = false;
		sanitizeURL	= false;
		imageFileUrl = "";
		imageNormalizedUrl = "";

		//old

		viewImageUrl : string;			//the image active in view. 
		viewImageUrlSafe : SafeUrl;		//the image active in view (sanitized)
		imageExistsMessage = "";
		imageUrlShownToUser = "";		//the url shown to the user as a string
	
	//images
	
		selectedImage = 0;	//default selected.

		images : ImageDefinition[];
		
	constructor	( private platform: Platform
				, private file: File
				, private sanitizer: DomSanitizer
				) {

		this.platform.ready().then(() => {

			//const hardCodedInternalHttpBase = "http://localhost:8080/_file_/data/user/0/dk.scaut.app.beta.ionicDemo/files/";
			//const hardCodedExternalHttpBase = "http://localhost:8080/_file_/storage/emulated/0/Android/data/dk.scaut.app.beta.ionicDemo/files/";
				
			this.images =	[ {name:"web bird"						, baseUrl: ""												, file: "http://en.bcdn.biz/Images/2016/6/1/ad1bcac8-b1df-447f-b3c2-4237b663b3c7.jpg"}
							, {name:"assets"						, baseUrl: ""												, file: "assets/imgs/logo.png"}
							, {name:"assets file://"				, baseUrl: this.file.applicationDirectory					, file: "www/assets/imgs/logo.png"}
							, {name:"assets http://"				, baseUrl: ""												, file: "http://localhost:8080/assets/imgs/logo.png"}
							, {name:"assets cdvfile://"				, baseUrl: "cdvfile://localhost/assets/"					, file: "www/assets/imgs/logo.png"}
							, {name:"internal file://"				, baseUrl: this.file.dataDirectory							, file: "cameraImage.jpg"}
							, {name:"internal cdvfile://"			, baseUrl: "cdvfile://localhost/files/"						, file: "cameraImage.jpg"}
							, {name:"external file://"				, baseUrl: this.file.externalDataDirectory					, file: "imageHawk.jpg"}
							]

		});

	}
	
	showImage() {

			const currentImage			= this.images[this.selectedImage];

			this.imageFileUrl			= currentImage.baseUrl + currentImage.file;
			this.imageNormalizedUrl		= normalizeURL(this.imageFileUrl);
		
		//checkImageExists

			this.checkImageExists(this.imageFileUrl);

		//clear
		
			this.viewImageUrl			= "";
			this.viewImageUrlSafe		= null;
			this.imageUrlShownToUser	= "";
		
		//show new

			if (this.useReadAsDataURL){
				this.imageUrlShownToUser	= this.imageFileUrl;
				this.showImageByReadAsDataURL(this.imageFileUrl);
			} else {
				this.imageUrlShownToUser	= this.imageNormalizedUrl;
				this.showImageNormal(this.imageNormalizedUrl);
			}
	}
	
	
	checkImageExists(imageUrl:string) {
		
		this.file.checkFile(imageUrl, '')
			.then(data => {
				this.imageExistsMessage = "Exists in file system";
			})
			.catch(error => {
				this.imageExistsMessage = "Don't exist in filesystem";
			});

	}

	//to switch between sanitized and not
	rawSetImageurl(imageUrl:string) {
		this.viewImageUrl		= imageUrl;
		this.viewImageUrlSafe	= this.sanitizer.bypassSecurityTrustUrl(imageUrl);
	}
	
	
	showImageNormal(imageUrl :string) {
		this.rawSetImageurl(imageUrl);
	}
	
	
	showImageByReadAsDataURL(imageUrl :string) {
		
		const filepath = imageUrl.replace(/^(.*?)([^\\\/]*)$/, '$1');
		const filename = imageUrl.replace(/^(.*?)([^\\\/]*)$/, '$2');

		console.log("DATA URL:");
		console.log("filepath: " + filepath);
		console.log("filename: " + filename);

		this.file.readAsDataURL(filepath, filename)
			.then((dataUrl : string) => {
				this.rawSetImageurl(dataUrl);
			})
			.catch(error => {
				console.log("Error")
				console.log(JSON.stringify(error));
			});

	}
	
}
