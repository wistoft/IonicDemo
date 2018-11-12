import { Component } from '@angular/core';

import { Market } from '@ionic-native/market';

import firebase from 'firebase';


@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	
	private authorized: boolean = false;	// tslint:disable-line
	
	constructor	(private market : Market) {
	
		firebase.auth().onAuthStateChanged(user => {
		  if (user) {
			this.authorized = true;
		  } else {
			this.authorized = false;
		  }
		});
	}
		
	create() {
		return firebase.auth().createUserWithEmailAndPassword("test@test.com", "tester")
			.then((o : firebase.auth.UserCredential) => {
				console.log(o);
			})
			.catch(error => {
				console.log("hej");
				console.log(JSON.stringify(error));
				console.log(error);
			})
			;

	}
		
	login() {
		return firebase.auth().signInWithEmailAndPassword("test@test.com", "tester")
			.then(data => {
				console.log("Signed in");
				console.log("uid: " + data.user.uid);
				//console.log(JSON.stringify(data));
			})
			.catch(error => {
				console.log(JSON.stringify(error));
				console.log(error);
			})
			;

	}
		
		
	logout() {
		return firebase.auth().signOut()
			.then(data => {
				console.log("Signed out");
			})
			.catch(error => {
				console.log(JSON.stringify(error));
				console.log(error);
			})
			;

	}

	openMarket() {
		//this.market.open('com.facebook.katana');
		this.market.open('id284882215');
		
	}	

}
