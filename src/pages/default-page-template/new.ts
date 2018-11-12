import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';

@Component({
  selector: 'new',
  templateUrl: 'new.html',
})
export class NewPage {

	constructor	( private platform: Platform
				, private file: File			// tslint:disable-line
				) {

		this.platform.ready().then(() => {
		
		});
	}
	

	on() {
		
	}


}
