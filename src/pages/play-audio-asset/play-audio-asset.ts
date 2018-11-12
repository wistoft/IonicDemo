import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-play-audio-asset',
  templateUrl: 'play-audio-asset.html',
})
export class PlayAudioAssetPage {
	
	private audioFile: MediaObject;
	

	constructor	( private platform: Platform
				, private media: Media
				, private file: File
				) {

		this.platform.ready().then(() => {
		
			//config
			
				let audioFilePath : string;
				let audioFilePathFixedForMediaPluginBug : string;
				
				if (this.platform.is("browser")){
					
					audioFilePath = 'assets/music.mp3';
					

				} else if (this.platform.is("android")){
					
					audioFilePath = this.file.applicationDirectory + 'www/assets/music.mp3';
					
					//not needed on android
					audioFilePathFixedForMediaPluginBug	= audioFilePath;

				} else if (this.platform.is("ios")){

					audioFilePath = this.file.applicationDirectory + 'www/assets/music.mp3';
					
					//necessary on ios, when opening audio with this.media.create()
					audioFilePathFixedForMediaPluginBug	= audioFilePath.replace(/^file:\/\//, '');
					
				} else {
					throw new Error("PlayAudioAssetPage() - platform unknown: " + this.platform.platforms());
				} 
				
			//check audio file exists
			
				this.file.checkFile(audioFilePath, '')
					.then(_ => console.log("music.mp3 found: " + audioFilePath))
					.catch(err => console.log("music.mp3 not found: " + audioFilePath))
					;
					
			//open audio file
				
				console.log("AudioFile: ", audioFilePath);

				//opens a file. (It doesn't create it)
				this.audioFile = this.media.create(audioFilePathFixedForMediaPluginBug);

				console.log("Duration: " + this.audioFile.getDuration());

			//subscribe
			
				this.audioFile.onStatusUpdate.subscribe(status => console.log("Status: " + status));

				this.audioFile.onSuccess.subscribe(() => console.log('Action is successful'));

				this.audioFile.onError.subscribe(error => console.log('Error!', JSON.stringify(error)));

		});
	}
	

	pauseAudio() {
		this.audioFile.pause();
	}

	playAudio() {
		this.audioFile.play();
	}


}
