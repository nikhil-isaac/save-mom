//render()
//makeGuess()
function render()
{
	if(!modalFlag && gameFlag)
	{
		if(updateCounter == 90)
		{
			modalFlag = true;
		}

		if(updateCounter == 91)
		{
			countdown.play();
		}
		updateCounter++;
		timer--;

		// Calculates minutes and seconds left from number of frames passed.
		var minutes = Math.floor(timer / 3600);
		var seconds = Math.floor( (timer - (minutes * 3600)) / 60 );
		// Waits till countdown sound ends before starting music.
		if(updateCounter == 600)
		{
			music.play();
		}
		// When timer runs out, it's game over.
		if(timer <= 0)
		{
			document.getElementById( 'minutes' ).innerHTML = "GAME";
			document.getElementById( 'seconds' ).innerHTML = "OVER";
			music.pause();	
					countdown.pause();
					ws.pause();
					//ws.play();	
					//ws.pause();	
					lost.pause();
					lost.currentTime = 0;
					lost.play();
			gameFlag = false;
		}

		// Keeps track of Hearts collected, updating the HUD.
		if(updateCounter % 5 == 0)
		{
			document.getElementById( 'Hearts-collected-amount' ).innerHTML = HeartsCollectedOverall;
			document.getElementById( 'Hearts-level-amount' ).innerHTML = HeartsCollected;
		}
		// Updates enemy movement
		if(updateCounter % 5 == 0)
		{
			for(var i = 0; i < enemies.length; i++)
			{
				if( enemies[i].state == "seek")
				{
					chase(enemies[i]);
				}

				var dx;
				var dy;
				
				dx = axisDiff(enemies[i], "x");
				dy = axisDiff(enemies[i], "y");

				if(dx < 4.5 && dy < 4.5)
				{ 

					document.getElementById( 'minutes' ).innerHTML = "GAME";
					document.getElementById( 'seconds' ).innerHTML = "OVER";
					document.getElementById( "modalMessage" ).innerHTML = "Dexter: You need to avoid meeting monsters and escape out of the maze to win the game!!!</br></br></br></br>Dexter's mom: After I come out of this game you are grounded for week,You got that Clear!!!</br>";
					music.pause();	
					countdown.pause();
					ws.pause();
					ws.play();	
					//ws.pause();	
					lost.pause();
					lost.currentTime = 0;
					lost.play();
					turnOnModal();
									
					//lost.pause();
					gameFlag = false;
				}
			}
		}

		// Checks to see if player has reached an elevator
		if(LEVEL != LEVEL_MAX-1 && updateCounter % 10 == 0)
		{
			if( (player.position.x >= elevator.position.x - 5) && (player.position.x <= elevator.position.x + 5) &&
				(player.position.y >= elevator.position.y - 5) && (player.position.y <= elevator.position.y + 5) )
			{
				music.pause();
			countdown.pause();
			won.play();
				nextLevel();

			}
		}
		else if(updateCounter % 10 == 0)
		{
			if( (player.position.x >= computer.position.x - 5) && (player.position.x <= computer.position.x + 5) &&
				(player.position.y >= computer.position.y - 5) && (player.position.y <= computer.position.y + 5) )
			{
				music.pause();
			countdown.pause();
			won.play();
				nextLevel();
			}
		}

		if(updateCounter % 30 == 0)
		{
			for(var j = 0; j < enemies.length; j++)
			{
				if( enemies[j].state == "idle" && isPlayerClose(enemies[j]) )
				{
					enemies[j].state = "seek";
				}
			}
		}

		if(updateCounter % 31 == 0)
		{
			for(var k = 0; k < enemies.length; k++)
			{
				if(enemies[k].state == "seek" && !isPlayerClose(enemies[k]))
				{
					enemies[k].state = "idle";
				}
			}
		}

		// Keeps track of the time, updating the HUD timer.
		if(updateCounter % 59 == 0)
		{
			document.getElementById( 'minutes' ).innerHTML = minutes;
			document.getElementById( 'seconds' ).innerHTML = seconds;
		}

		// Player presses a keyboard key.
		keyPressed();
	}

		requestAnimationFrame( render );
		
		renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
		renderer.render( scene, camera );
		
		renderer2.enableScissorTest(true);
		renderer2.setViewport( 0, 0, 150, 150);
		renderer2.render( scene, miniMapCamera );
}
function makeGuess()
{
	var selectionElement = document.getElementById( 'guesses' );
	var selection = selectionElement.options[selectionElement.selectedIndex].value;
	console.log("You chose: " + selection);
	if(selection === pword)
	{
		console.log("You chose right!");
		levelSpecificModal(3);
	}
	else
	{
		console.log("You chose wrong!");
		levelSpecificModal(4);
	}
}