import { Injectable } from '@angular/core';


import { File } from '@ionic-native/file';


@Injectable()
export class UtilService {

	constructor(private file: File) {

	}

	rejectPromise(func? : () => void){
		
		if (func == null){
			
			return Promise.reject("PromiseRejectMessage")
			// .catch(error => {
			// 	console.log("ignored distant");
			// })
			;

		} else {
			
			return Promise.resolve()
			.then(func)
			;

		}
		
	}

	dumpingFileMetaData(path : string, fileNamePath : string) : any {

		if (path == null){
			console.log("dumpingFileMetaData() - path is null");
			return;
		}
				
		this.file.resolveDirectoryUrl(path)
			.then((rootDir) => {
				return this.file.getFile(rootDir, fileNamePath, { create: false })
			})
			.then((fileEntry) => {
				
				fileEntry.getMetadata((data)=>{
					console.log("-----------------------------------------------------------------");
					console.log("- File metadata: "	+ path + fileNamePath);
					console.log("-----------------------------------------------------------------");
					console.log("Name: "			+ fileEntry.fullPath);
					console.log("Modification: "	+ data.modificationTime);
					console.log("size: " 			+ data.size);
				}, (error)=>{
					console.log(error);
				});
			})
			.catch(error => {
				console.log("-----------------------------------------------------------------");
				console.log("- File metadata: "	+ path + fileNamePath) ;
				console.log("-----------------------------------------------------------------");
				console.log("Name: "			+ fileNamePath);
				console.log("error: "			+ error.message);
				//console.log("error: "			+ JSON.stringify(error));
			})
			;

	}

	dumpingFilesInFolder(path : string, dirName : string = "") : any {
	
		if (path == null){
			console.log("dumpingFileMetaData() - path is null");
			return;
		}
		
		let p1 = this.file.listDir(path, dirName);
				
		let p2 = p1.then(list => {
			
			console.log("-----------------------------------------------------------------");
			console.log(`- Path: ${path}${dirName}`);
			console.log("-----------------------------------------------------------------");
				
			for (const file of list){
			
				console.log(file.fullPath);
				
			}
			
			console.log("");
			
		});
		
		let p3 = p2.catch(error => {
			console.log("-----------------------------------------------------------------");
			console.log(`- Couldn't list path -- ${path}${dirName}`);
			console.log("-----------------------------------------------------------------");
			console.log("");
		});
		
		return p3;
				
	}
	


}
