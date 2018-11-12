	let FCM = require('fcm-push');
	let SERVER_KEY = require('./testPushSecret.js').SERVER_KEY;

	let fcm = new FCM(SERVER_KEY);

//client key

	let registrationKey = "clwnpDX9Cms:APA91bEaEyRFZbu7QMNl1uXgN3JIpxgkB4yROngS_y5WhNxtSEaN8KXHrfAfKpQCMuE8dv-R5EKRPi6MmBocLAiR3__55BrwsvwEwnCAVfWvrgwISl0pUK0swSuzVSJNiA2cUXMKqQjY";

//incrementing badge number

	//android

		//This works.
		let message = {
			to: registrationKey,
			data: {
				title: 'IonicDemo',
				body: 'You have been pushed.',		//alias: message
				count: 1
			}
		};

		//Also works
		let message2 = {
			to: registrationKey,
			notification: {
				title: 'IonicDemo',
				body: 'You have been pushed 3.',	//property message is not working here.
			},
			data: {
				count: 2
			}
		};
		
		//Not working. This will not change the badge number, when the app is in the background, or include the badge number in the event fired, when in foreground
		let message3 = {
			to: registrationKey,
			notification: {
				title: 'IonicDemo',
				body: 'You have been pushed 2.',	//property message is not working here.
				count: 3
			}
		};


fcm.send(message)
    .then(function(response){
        console.log("Success: ", response);
    })
    .catch(function(err){
        console.log("Error" + err);
		console.log(JSON.stringify(err));
    })