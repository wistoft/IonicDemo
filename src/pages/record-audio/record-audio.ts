import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';


import { UtilService } from '../../services/app.util.service';

@Component({
  selector: 'page-record-audio',
  templateUrl: 'record-audio.html',
})
export class RecordAudioPage {

//view

	public currentStatus : string;

//controller
	
	private audioFile : string;
	private audioFolder : string;
	private audioFolderFixedForMediaPluginBug : string;
	private mediaObject: MediaObject;
	private outputAmp: boolean;

	constructor	( private platform: Platform
				, private file: File
				, private media: Media
				, private util: UtilService
				) {
		
		this.platform.ready().then(() => {

			this.currentStatus = "Initializing.";
		
			if (this.platform.is("browser")){
				
				this.audioFile 								= 'myFile.3gp';

				//TODO:. adjust
				this.audioFolder							= this.file.externalDataDirectory;

				//this.audioFolderFixedForMediaPluginBug	= this.audioFolder.replace(/file:\/\//g, '');
				
			} else if (this.platform.is("android")){
				
				//external works
				
					this.audioFile 								= 'myFile.3gp';
					this.audioFolder							= this.file.externalDataDirectory;
					
					//not needed for android
					this.audioFolderFixedForMediaPluginBug		= this.audioFolder;
				
			} else if (this.platform.is("ios")){
				
					
					this.audioFile 							= 'mya.m4a';
					this.audioFolder						= this.file.tempDirectory;
					
					//necessary on ios, when opening audio with this.media.create()
					this.audioFolderFixedForMediaPluginBug	= this.audioFolder.replace(/^file:\/\//, '');
						
			} else {
				throw new Error("RecordAudioPage() - platform unknown: " + this.platform.platforms());
			} 
				
			
			this.currentStatus = "Ready.";
		});
	}

	outInfo() {
		
		this.util.dumpingFilesInFolder(this.audioFolder)
			.then(()=>{
				return this.util.dumpingFileMetaData(this.audioFolder, this.audioFile);
			})
			;
		
	}

	recordAudio() {
		
		//file name
			
			let fileName = this.audioFolderFixedForMediaPluginBug + this.audioFile;

			console.log("AudioFile: ", fileName);
			
		//open
			
			this.mediaObject = this.media.create(fileName);
			console.log("media opened.");
			
		//subscribe
		
			this.mediaObject.onStatusUpdate.subscribe(status => console.log("Status: " + status));

			this.mediaObject.onSuccess.subscribe(() => console.log('Action is successful'));

			this.mediaObject.onError.subscribe(error => console.log('Error!', JSON.stringify(error)));

		//record
			
			this.mediaObject.startRecord();
			console.log("recording.");
			this.currentStatus = "Recording.";
		
		//amplitude
		
			this.outputAmp = true;
		
			let interval = setInterval(()=>{
				
				if (!this.outputAmp){
					clearInterval(interval);
				}
				
				this.mediaObject.getCurrentAmplitude()
				.then(amp => {
					console.log("amp: " + amp);
				})
				.catch(err => console.log("amp error: " + err))
				;
				
			}, 200);
		
		//stop
			
			// window.setTimeout(() => {
				
			// 	outputAmp = false;
				
			// 	console.log("Duration: " + this.mediaObject.getDuration());
			
			// 	this.mediaObject.stopRecord();
			// 	console.log("recording stopped.");
				
			// 	this.mediaObject.release();
			// 	console.log("released.");
				
			// }, 5000);
			
		
	}

	stopRecordAudio() {
				
		this.outputAmp = false;	//stop the interval timer.

		console.log("Duration: " + this.mediaObject.getDuration());
	
		this.mediaObject.stopRecord();
		console.log("recording stopped.");
		
		this.mediaObject.release();
		console.log("released.");
		
		this.currentStatus = "Ready.";
	}
	
	playRecordedAudio() {
		
		//file name

			let fileName = this.audioFolderFixedForMediaPluginBug + this.audioFile;

			console.log("AudioFile: ", fileName);

		//open
			
			this.mediaObject = this.media.create(fileName);
			console.log("media opened");
			
			console.log("Duration: " + this.mediaObject.getDuration());
			
		//subscribe
		
			this.mediaObject.onStatusUpdate.subscribe(status => {
				
				//console.log("Status: " + status);
				
				if (status === 2){	//status: running
					//console.log("run");
					
					//duration not working here either
					console.log("Duration: " + this.mediaObject.getDuration());
				}
				
				//when the audio stops by itself.
				if (status === 4){	//status: stopped
					this.mediaObject.release();
					console.log("released");  
					this.currentStatus = "Ready.";
				}
				
			});

			this.mediaObject.onSuccess.subscribe(() => console.log('Action is successful'));

			this.mediaObject.onError.subscribe(error => console.log('Error!', JSON.stringify(error)));

		//play
			
			this.mediaObject.play();
			console.log("playing");
			this.currentStatus = "Playing.";
		
	}

	stopPlayAudio() {
		this.mediaObject.pause();
		this.currentStatus = "Ready.";
	}
	

}
