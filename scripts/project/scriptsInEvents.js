var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}



const scriptsInEvents = {

		async Es_game_Event69_Act17(runtime, localVars)
		{
			postText(runtime.globalVars.finalScore)
			
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

