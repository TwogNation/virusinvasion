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

	async Es_game_Event75_Act4(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:10")
	},

	async Es_game_Event76_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:100")
	},

	async Es_game_Event82_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:300")
	},

	async Es_game_Event89_Act19(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Es_game_Event89_Act20(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
		
	},

	async Es_buttonsAndFonts_Event27_Act1(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		console.log("clicked")
					const textInstance = runtime.objects.ErrorText.getFirstInstance()
					textInstance.text = "PLEASE WAIT..."
					const button = runtime.objects.Play.getFirstInstance();
					button.destroy(); 
		// Add a variable to track if the WebSocket is already connected or in the process of connecting
		let isWebSocketConnectingOrConnected = false; 
					
		try {
		    // Check if the WebSocket is already connected or in the process of connecting
		    if (!isWebSocketConnectingOrConnected) {
		        const webSocket = new WebSocket('wss://arcade.legacyarcade.com/ws', [token, gameId]);
		        runtime.globalVars.webSocket = webSocket;
		
		        webSocket.onopen = (event) => {
		            isWebSocketConnectingOrConnected = true;  // Set the flag to true when connection is established
		            runtime.callFunction('startendless');
		        };
		
		        webSocket.onclose = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag when the connection is closed
		        };
		
		        webSocket.onerror = (event) => {
		            isWebSocketConnectingOrConnected = false; // Reset the flag on error
		        };
		
		        runtime.globalVars.playable = 1;
		    }
		} catch (e) {
		    const textInstance = runtime.objects.ErrorText.getFirstInstance();
		    textInstance.text = "ERROR CONNECTING";
		    console.log("error connecting to server", e);
		}
		
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

