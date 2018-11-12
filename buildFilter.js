#!/usr/bin/env node

	const fs = require("fs");
//

	var stdin = process.openStdin();

	var lastWasDot = false;

	const time = Date.now() * 1000;

//read lines to ignore

	const ignoreLines = ("" + fs.readFileSync("buildFilterIgnoreLines.txt")).split("\n");

//truncate files


	fs.writeFileSync("BuildLog.txt", "");
	fs.writeFileSync("BuildLogShown.txt", "");

//listeners

	stdin.on('data', function(rawChunk) {

			let chunk = ""+rawChunk;

		//log all data to file

			fs.appendFileSync("BuildLog.txt", chunk);
			fs.appendFileSync("tmp/BuildLog_" + time + ".txt", chunk);

		//filter

			if (chunk.indexOf("\n") > -1){

				let arr = chunk.split("\n");

				if (chunk.slice(-1) == "\n"){
					const tmp = arr.pop();
				}

				//console.log("LEN: " + arr.length);

				arr.forEach(line=>{

					handleLine(line);

				});
				
			} else {
				console.log("no newline");
			}

	});

	stdin.on('end', function() {

	  
	});
	
//functions

	function handleLine(line){
		
		//conf
			
			const replaceText = ".";

		//try filter

			for (const ignore of ignoreLines){
				if (replaceIgnoringNumbers(line, ignore)){

					//replacing

						process.stdout.write(replaceText);
						lastWasDot = true;
						return;
				}
			}

		//not not filtered

			//log to file
			
				fs.appendFileSync("BuildLogShown.txt", line + "\n");
				fs.appendFileSync("tmp/BuildLogShown_" + time + ".txt", line + "\n");

			//log to console
			
				if (lastWasDot)	process.stdout.write("\n" + line + "\n");
				else			process.stdout.write(line + "\n");

				lastWasDot = false;
	}

	function replaceIgnoringNumbers(haystack, search, replace = ""){
		const haystack2 = haystack.replace(/\d/g, "");
		const search2 = search.replace(/\d/g, "");

		return search2 == haystack2;
	}