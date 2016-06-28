"use strict";
var StepNC = require('../../../../../STEPNode/build/Release/StepNC');
var fs = require("fs");
//Query for a json file that maps all projects in the data directory
//to a particular path in the data folder

let content = fs.readFileSync("data/pathmap.json");
let jsoncontent = JSON.parse(content);
//let machineStates = {};
let getPath;
var app;

class NC{
	constructor(){
		this.path = app.project;
		this.finder = new StepNC.Finder();
		this.apt = new StepNC.AptStepMaker();
		this.tol = new StepNC.Tolerance();
		this.ms = {}
		this.ms[ncId] = new StepNC.machineState(this.path);
		finder.OpenProject(this.path);
		apt.OpenProject(this.path);
	}

	getMachineState(globalApp, ncId){
		let ncPath = this.path;
		if (ncPath === undefined)
			return;
		if (typeof(machineStates[ncId]) === 'undefined') {
			this.ms[ncId] = new StepNC.machineState(ncPath);

	        // load the machine tool using global options
	        if (globalApp.machinetool !== "")
	          if (!this.ms[ncId].LoadMachine(globalApp.machinetool))
	              globalApp.logger.error("Failed to load machine tool: " + globalApp.machinetool);
	          else
	              globalApp.logger.info("Loaded machine tool: " + globalApp.machinetool);

		}
		return this.ms[ncId];
	}
}

//module.exports.NC = new NC()

module.exports.getPath = function getPath(ncId){
	let lowncId = ncId.toLowerCase();
	if(jsoncontent[lowncId] || jsoncontent[ncId]){
		if (fs.existsSync(jsoncontent[lowncId])) {
	    	console.log('Found file');
	    	return jsoncontent[lowncId];
		}
		else if(fs.existsSync(jsoncontent[ncId])){
			console.log('Found file');
			return jsoncontent[ncId];
		}
		else{
			console.log("THE FILE WAS NOT OPEN");
			return jsoncontent[lowncId];
		}
	}
	else
		console.log("This project doesn't exist");
		return;
}
getPath=module.exports.getPath;

/*module.exports.getMachineState = function (globalApp, ncId) {
    let ncPath = getPath(ncId);
	if (ncPath === undefined)
		return;
	if (typeof(machineStates[ncId]) === 'undefined') {
		machineStates[ncId] = new StepNC.machineState(ncPath);

        // load the machine tool using global options
        if (globalApp.machinetool !== "")
          if (!machineStates[ncId].LoadMachine(globalApp.machinetool))
              globalApp.logger.error("Failed to load machine tool: " + globalApp.machinetool);
          else
              globalApp.logger.info("Loaded machine tool: " + globalApp.machinetool);

	}
	return machineStates[ncId];
}

module.exports.apt = new StepNC.AptStepMaker();
module.exports.find = new StepNC.Finder();
module.exports.tol = new StepNC.Tolerance();*/
