var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}



const scriptsInEvents = {

	async Es_game_Event1_Act1(runtime, localVars)
	{
		runtime.globalVars.webSocket.onMessage = (event) => {
			if (event.data.startsWith('s:')){
				const score_ = event.data.split(':')[1];
				console.log(score_);
				runtime.globalVars.score = score_;
				runtime.callFunction("updateScore")
			}
		}
	},

	async Es_game_Event55_Act4(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:10")
	},

	async Es_game_Event56_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:100")
	},

	async Es_game_Event62_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:300")
	},

	async Es_game_Event69_Act17(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Es_buttonsAndFonts_Event13_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		
		try{
			const webSocket = new WebSocket('wss://arcade.stage.legacyarcade.com/ws', [token,gameId]);
			runtime.globalVars.webSocket = webSocket;
			webSocket.onopen = (event) =>{
				runtime.callFunction('startendless');
			};
		}catch(e){
			const textInstance = runtime.objects.ErrorText.getFirstInstance()
			textInstance.text = "ERROR CONNECTING"
			console.log("error connecting to server", e)
		}
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

