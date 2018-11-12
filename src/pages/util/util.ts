import { Component } from '@angular/core';


import { File } from '@ionic-native/file';

import { UtilService } from '../../services/app.util.service';

@Component({
	selector: 'page-util',
	templateUrl: 'util.html'
})
export class UtilPage {

	constructor	( private file: File
				, private util: UtilService
				) {

	}

	listFolders() {
			
			
		console.log("");
		console.log("-----------------------------------------------------------------");
		
		console.log("applicationStorageDirectory: "	, this.file.applicationStorageDirectory);
		
			//browser: 
			//android:	file:///android_asset/
			//ios:		file:///var/mobile/Containers/Data/Application/.../
		
		console.log("applicationDirectory: "	, this.file.applicationDirectory);
		
			//browser: 
			//android:	file:///android_asset/
			//ios:		file:///var/containers/Bundle/Application/.../IonicDemo.app/
			
		console.log("dataDirectory: "			, this.file.dataDirectory);
		
			//browser:	file:///persistent/
			//android:	file:///data/user/0/io.ionic.starter/files/
							//actual: \Internt lager\Android\data\io.ionic.starter\files
			//ios:		file:///var/mobile/Containers/Data/Application/.../Library/NoCloud/
			
		console.log("cacheDirectory: "			, this.file.cacheDirectory);
				
			//browser: file:///temporary/
			//android: file:///data/user/0/io.ionic.starter/cache/
						//actual: \Internt lager\Android\data\io.ionic.starter\cache
			//ios:		file:///var/mobile/Containers/Data/Application/.../Library/Caches/
			
		console.log("externalDataDirectory: "	, this.file.externalDataDirectory);
		
			//browser: 
			//android: 	.../files/
			//ios: 		N/A
			
		
		
	}
	
	listFiles() {
				
		console.log("");
		console.log("applicationStorageDirectory");
		
		this.util.dumpingFilesInFolder(this.file.applicationStorageDirectory)
			.then(() => {
				console.log("");
				console.log("applicationDirectory");
				return this.util.dumpingFilesInFolder(this.file.applicationDirectory);
			})
			.then(() => {
				return this.util.dumpingFilesInFolder(this.file.applicationDirectory, "www");
			})
			.then(() => {
				return this.util.dumpingFilesInFolder(this.file.applicationDirectory, "www/assets");
			})
			.then(() => {
				console.log("");
				console.log("cacheDirectory");
				return this.util.dumpingFilesInFolder(this.file.cacheDirectory);
			})
			.then(() => {
				console.log("");
				console.log("dataDirectory");
				return this.util.dumpingFilesInFolder(this.file.dataDirectory);
			})
			.then(() => {
				console.log("");
				console.log("external");
				return this.util.dumpingFilesInFolder(this.file.externalDataDirectory);
			})
			;
		
	}


	checkAndCreateFiles() {
		
		//check files
				
			this.file.checkFile(this.file.applicationDirectory, "www/assets/imgs/logo.png")
				.then(_ => console.log("applicationDirectory/www/assets/imgs/logo.png exists."))
				.catch(err => console.log("applicationDirectory/www/assets/imgs/logo.png don't exists."))
				;
				
			this.file.checkFile(this.file.applicationDirectory, "www/assets/music.mp3")
				.then(_ => console.log("applicationDirectory/www/assets/music.mp3 exists."))
				.catch(err => console.log("applicationDirectory/www/assets/music.mp3 don't exists."))
				;
				
		//create
		
			this.file.createFile(this.file.dataDirectory, 'test.txt', true).then(() => {	//true means replace
				console.log("File created");
				
				this.file.checkFile(this.file.dataDirectory, 'test.txt')
					.then(_ => console.log("dataDirectory/test.txt exists."))
					.catch(err => console.log("dataDirectory/test.txt don't exists."))
					;
			});
			
	}

	throwError(){
		throw new Error("RuntimeThrowMessage");
	}

	rejectPromise(){
		Promise.reject("PromiseRejectMessage");
	}

	rejectPromiseDistant(){
		this.util.rejectPromise()
			// .catch(error => {
			// 	console.log("ignored close");
			// 	console.log(error.originalException);
			// })
			;
	}

	rejectPromiseDistantLocalCode(){
		this.util.rejectPromise(()=>{
				throw new Error("PromiseRejectMessage1");
			})
			// .catch(error => {
			// 	console.log("ignored close");
			// 	console.log(error.originalException);
			// })
			;
	}

}
