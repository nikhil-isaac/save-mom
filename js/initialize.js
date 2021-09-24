//init()
//loadSounds()
//spawnPlayer()
//turnOnLights()
//nextlebel
//nextLevel()
//levelSpecificModal(lev)
//LoadFile()
keyboard = new THREEx.KeyboardState();
	
function init()
{
	maps.push(map1);
	maps.push(map2);
	//$maps.push(map3);
	//$maps.push(map4);
	//$maps.push(map5);
	LEVEL_MAX = maps.length;
	mapBlockedAreas[LEVEL] = [];
	availableMoves[LEVEL] = [];
	START_COORDS[LEVEL] = [];
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x000000, 0 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.autoClear = false;

	renderer2 = new THREE.WebGLRenderer();
	renderer2.setClearColor( 0x000000, 0 );
	renderer2.setSize( 150, 150 );
	renderer2.autoClear = false;

	loadSounds();
	
	populateScene();

	generateCameras();

	spawnPlayer();

	turnOnLights();
	
	// Contains the 1st POV, and all HUD elements.
	var container = document.getElementById("mainview");
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	
	// Contains the miniMapView
	var container2 = document.getElementById("miniMapView");
	document.body.appendChild( container2 );
	container2.appendChild( renderer2.domElement );

	document.getElementById( "Hearts-level-amount" ).innerHTML = HeartsCollected;
	document.getElementById( "Hearts-level-total" ).innerHTML = Hearts.length;
	document.getElementById( "Hearts-collected-amount" ).innerHTML = HeartsCollectedOverall;

	document.getElementById( "level-number" ).innerHTML = LEVEL + 1;
	document.getElementById( "total-levels" ).innerHTML = LEVEL_MAX;

	totalHearts = Hearts.length;

	render();
}
function loadSounds()
{
	music = new Audio("assets/audio/music.mp3");
	music.loop = true;
	countdown = new Audio("assets/audio/countdown.mp3");
	datanode = new Audio("assets/audio/datanode.mp3");
	footsteps = new Audio("assets/audio/footsteps.mp3");
	lost = new Audio("assets/audio/lost.mp3");
	won = new Audio("assets/audio/won.mp3");
	ws = new Audio("assets/audio/ws.mp3");
}
function spawnPlayer()
{
	// Player's physical form
	/*var playerGeometry = new THREE.CubeGeometry( 2,2,2 );
	var playerMaterial = new THREE.MeshBasicMaterial({color:'yellow'});
	var playerTexture = THREE.ImageUtils.loadTexture('assets/textures/momHeart-drive.png');*/
	
	
	// CUBE
		var playerGeometry = new THREE.BoxGeometry( UNIT_SIZE/7*2, WALL_HEIGHT/4*2, WALL_HEIGHT/10, 1, 1, 1 );
		var playerMaterial =new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/textures/back.jpg')});
		/*[
				new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture('enemy4.jpg')
				}),
				new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture('enemy4.jpg')
				}),
				new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture('enemy4.jpg')
				}),
				new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture('enemy4.jpg')
				}),
				new THREE.MeshBasicMaterial({
					color: 'red'
				}),
				new THREE.MeshBasicMaterial({
					color: 'black'
				})
			];*/
			

			/*[
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'assets/textures/front.jpg' ), side: THREE.DoubleSide } ), // Front side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'assets/textures/back.jpg' ), side: THREE.DoubleSide } ), // Back side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'assets/textures/up.jpg' ), side: THREE.DoubleSide } ), // Up side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'assets/textures/down.jpg' ), side: THREE.DoubleSide } ), // Down side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'assets/textures/right.jpg' ), side: THREE.DoubleSide } ), // Right side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'assets/textures/left.jpg' ), side: THREE.DoubleSide } ) // Left side
		];*/
		//new THREE.MeshBasicMaterial({color:'yellow'});
		// Create a MeshFaceMaterial, which allows the cube to have different materials on each face
		
	player = new THREE.Mesh( playerGeometry, playerMaterial );
	//player.position.set(START_COORDS[LEVEL][0],200, 0);//$START_COORDS[LEVEL][22]+100, START_COORDS[LEVEL][25], 2
	player.position.x = START_COORDS[LEVEL][0];//, , 0
	player.position.y = START_COORDS[LEVEL][1];;//START_COORDS[LEVEL][0];START_COORDS[LEVEL][1];
	player.position.z = 3;
	scene.add( player );
	
	
	//player.rotation.y = Math.PI/2;
	player.rotation.x = Math.PI/2;
	player.rotation.y = Math.PI/2;
	//player.rotation.z = Math.PI;
	
}
function turnOnLights()
{
	// Main lightsource -- shadows eliminated
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 10, 20, 20 );
    spotLight.castShadow = true;//shadowing
    scene.add(spotLight);
}
function nextLevel()
{
	/* Dismantles previous level 					*/
	
	music.pause();
	music.currentTime = 0;
	countdown.currentTime = 0;
	scene.remove(walls);
	scene.remove(floor);
	scene.remove(ceiling);
	scene.remove(startPoint);
	scene.remove(elevator);
	scene.remove(player);
	for(var i = 0; i < Hearts.length; i++)
	{
		scene.remove(Hearts[i]);
	}
	Hearts.length = 0;
	for(var j = 0; j < enemies.length; j++)
	{
		scene.remove(enemies[j].entity);
	}
	enemies.length = 0;
	/* Dismantles previous level 					*/

	/* Resets level-specific counters				*/
	HeartsCollected = 0;
	updateCounter = 0;
	/* Resets level-specific counters				*/

	/* Builds next level 							*/
	LEVEL++;
	levelSpecificModal();
	turnOnModal();
	
	//won.pause();
	mapBlockedAreas[LEVEL] = [];
	availableMoves[LEVEL] = [];
	START_COORDS[LEVEL] = [];
	populateScene();//populates scene
	spawnPlayer();//spawns a
	totalHearts += Hearts.length;
	/* Builds next level 							*/

	/* Positions camera in new starting location.	*/
	camera.position.set(START_COORDS[LEVEL][0], START_COORDS[LEVEL][1], 5);//camera.position.set(START_COORDS[LEVEL][0]+240, 200+140, 0);
	camera.rotation.x = 0;
	camera.rotation.y = 0;
	camera.rotation.z = 0;
	var pos = new THREE.Vector3( START_COORDS[LEVEL][0], 200, 0 );
	camera.lookAt( scene.position );
	camera.rotation.x = Math.PI/2;
	camera.rotation.y = Math.PI/2;
	/* Positions camera in new starting location.	*/

	/* Updates HUD for level-specific variables.	*/
	document.getElementById( "level-number" ).innerHTML = LEVEL + 1;
	document.getElementById( "Hearts-level-total" ).innerHTML = Hearts.length;
	/* Updates HUD for level-specific variables.	*/
}
// Story elements presented in modal form at start of each level
// First level already in HTML.
function levelSpecificModal(lev)
{
	LEVEL = (lev == null || lev == undefined) ? LEVEL : lev;
	var modal = document.getElementById( "modal" );
	switch(LEVEL)
	{
		/*// Level #2
		case 1:
		{
			document.getElementById( "modalMessage" ).innerHTML = "Dexter: Way to go Mom!!! you have cleared level 1</br></br>Dexter Mom: What? How many levels more?</br>Dexter: 5 levels mom, you can do it...</br>Dexter Mom: The more time I am in this game, the more will be the length of your punishment, mister!!!";
			break;
		}
		// Level #3
		case 2:
		{
			document.getElementById( "modalMessage" ).innerHTML = "Dexter: You have made it to level 3, Congrats Mom!!! ";
			break;
		}
		// Level #4
		case 3:
		{
			document.getElementById( "modalMessage" ).innerHTML = "Dexter: Almost there, Mom!!!</br></br></br></br>";
			break;
		}*/
		// Level #5
		case 1://4
		{
			music.pause();
			//music.pause();	
			countdown.pause();
			won.pause();
			won.currentTime = 0;
			won.play();
			document.getElementById( "modalMessage" ).innerHTML = "Dexter: This is it, Mom!</br>This is the final showdown mom???</br>Dexter's Mom: Yay!!!!</br>Dexter: All the best mom, see you soon!!!</br>Dexter Mom: See you soon son!!!";
			
			break;
		}
		case 2://5
		{
			/*var percentComplete = (HeartsCollectedOverall - 150) / totalHearts;
			var bonusLetters = Math.round(8 * percentComplete);
			bonusLetters = (bonusLetters <= 0) ? 1 : bonusLetters;

			pwordDisplay = "";
			for(var i = 0; i < 8; i++)
			{
				if(Math.round(Math.random()) && bonusLetters > 0)
				{
					pwordDisplay += pword[i] + " ";
					bonusLetters--;
				}
				else pwordDisplay += "_ ";
			}*/
			
			document.getElementById( "modal" ).innerHTML =			"<div id='modalMessage' style='margin-bottom: 20px;'>WINNER!!!</br>Dexter: You made it mom!!! This is the portal for you to come out!!!  You have got <span style='color: red; font-weight: strong;'>" + HeartsCollectedOverall + 
			"</span> out of <span style='color: red; font-weight: strong;'>" + totalHearts + "</span> pieces of Hearts. That will help you to get most of yourself back to the real world!!!</br>Dexter's Mom: What did you say??Most of myself back!! Dexter your grounded for life!!!</br>Dexter: Just kidding mom...An evil genius like me could easily bring you back with a press of button!!!</div>Dexter's Mom: DEXTERRRRRRRR!!!!!!</br>Dexter: OOPS!!";
			/*document.getElementById( "modal" ).innerHTML += 
			"<div id='question' style='margin-bottom: 20px; text-align: center;'>" + pwordDisplay + "</div>";
			document.getElementById( "modal" ).innerHTML += listbox + "<button onclick='makeGuess()'>CONTINUE</button>";*/
			console.log("Winner!!!");
		    levelSpecificModal(3);
			break;
		}
		case 3://6
		{
			
			document.getElementById( "modal" ).innerHTML = "<div id='modalMessage' style='margin-bottom: 20px;'>Dexter: You won mom!!!</br></br>You found the exit of the maze, Congrats mom, you made it outside!!!</br></br>Dexter Mom: Yay!!!!</div>";
			document.getElementById( "modal" ).innerHTML += "<button onclick='turnOffModal()'>REPLAY</button>";
			break;
		}
		case 4://7
		{
			document.getElementById( "modal" ).innerHTML = "<div id='modalMessage' style='margin-bottom: 20px;'>Dexter: Time's up, mom!!!</br></br>Dexter mom: what? That means I can't never be with my family anymore!!!</br>Dexter: Actually!!! Mom, If I press the reset button all characters inside would come out outside!!! </br>Dexter Mom: DEXTER!!! You are grounded for life!!!</div>";
			document.getElementById( "modal" ).innerHTML += "<button onclick='turnOffModal()'>REPLAY</button>";
			break;
		}
	}
}
function LoadFile()
{
	var oFrame = document.getElementById("frmFile");
	var rawContent = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
	while (rawContent.indexOf("\r") >= 0) rawContent = rawContent.replace("\r", "");
	var arrLines = rawContent.split("\n");

	var words = [];
	for(var i = 0; i < arrLines.length; i++) {
		if(arrLines[i].length == 8) words.push(arrLines[i]);
	}

	var wordIndex = Math.floor(Math.random() * 7367);
	wordIndex = (wordIndex > words.length) ? (words.length - 1) : wordIndex;
	pword = words[wordIndex];
	console.log(pword); //DEBUG
	
	var pwordIndex = Math.floor(Math.random() * 8) + 1;
	console.log(pwordIndex);

	var infiniteLoopBreakPoint = 0;
	listbox = "<select id='guesses' style='margin-left: 25%; width: 50%;'>";
	for(var j = 0; j < 10 && infiniteLoopBreakPoint <= 7000; j++)
	{
		infiniteLoopBreakPoint++; // In case there aren't ten words that match the below criteria.
		if(j === pwordIndex)
		{
			possiblePwords.push(pword);
			listbox += "<option value='" + pword + "'>" + pword + "</option>";
		}
		else
		{
			var curChoice = words[Math.floor(Math.random() * 7366)];
			if(	possiblePwords.indexOf(curChoice) === -1 && curChoice.charAt(0) === pword.charAt(0) && curChoice.charAt(7) === pword.charAt(7) )
			{
				possiblePwords.push(curChoice);
				console.log(curChoice);
				listbox += "<option value='" + curChoice + "'>" + curChoice + "</option>";
			}
			else if(possiblePwords.indexOf(curChoice) === -1 && curChoice.charAt(0) === pword.charAt(0) && curChoice.charAt(3) === pword.charAt(3) )
			{
				possiblePwords.push(curChoice);
				console.log(curChoice);
				listbox += "<option value='" + curChoice + "'>" + curChoice + "</option>";
			}
			else if(possiblePwords.indexOf(curChoice) === -1 && curChoice.charAt(0) === pword.charAt(0) && curChoice.charAt(5) === pword.charAt(5) )
			{
				possiblePwords.push(curChoice);
				console.log(curChoice);
				listbox += "<option value='" + curChoice + "'>" + curChoice + "</option>";
			}
			else if(possiblePwords.indexOf(curChoice) === -1 && curChoice.charAt(0) === pword.charAt(0) && curChoice.charAt(1) === pword.charAt(1) )
			{
				possiblePwords.push(curChoice);
				console.log(curChoice);
				listbox += "<option value='" + curChoice + "'>" + curChoice + "</option>";
			}
			else j--;
		}
		if(infiniteLoopBreakPoint == 7000 && j < pwordIndex)
		{
			possiblePwords.push(pword);
			listbox += "<option value='" + pword + "'>" + pword + "</option>";
		}
	}
	listbox += "</select>";
}