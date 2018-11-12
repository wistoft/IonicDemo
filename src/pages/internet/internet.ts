import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'internet',
  templateUrl: 'internet.html',
})
export class InternetPage {

	conType: string;
	log: string = "";
	
	constructor	( private platform: Platform
				, private network: Network
				) {


		this.platform.ready().then(() => {

			this.conType = this.network.type;

			this.network.onDisconnect().subscribe(data => {
				console.log('Disconnected: ', JSON.stringify(data));
				
				this.log += "dis\n";
				this.conType = "" + this.network.type;
			});


			this.network.onConnect().subscribe(data => {
				
				console.log('Connected: ', JSON.stringify(data));
				
				this.log += "con\n";
				this.conType = "" + this.network.type;

			});


		});
	}
	

	on() {
		this.conType = "" + this.network.type;
		console.log(this.network.type);
	}


}

