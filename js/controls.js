//keyPressed()
//turnOffModal()
//turnOnModal()
function keyPressed()
{
	// Simultaneous press of S W & D, or UP & RIGHT
	if( ( keyboard.pressed("right1") || keyboard.pressed("right2") ) &&
		( keyboard.pressed("forward1") || keyboard.pressed("forward2") ) )
	{
		rotateCamera("right");
		switch( moveCamera( player.position.x, player.position.y, -1, 1 ) )
		{
			case "clear": // No obstructions
			{
				break;
			}
			case "collision": // Obstruction: using old or modified coordinates.
			{
				// Keep player's physical form in-sync with camera position.
				player.position.x = player.position.x;//4
				player.position.y = player.position.y;//$
				player.position.z = player.position.z;
				break;
			}
			default:
			{
				break;
			}
		}
		for(var i = 0; i < Hearts.length; i++)
		{
			if( (player.position.x >= Hearts[i].position.x - 5) && (player.position.x <= Hearts[i].position.x + 5) )
			{
				if( (player.position.y >= Hearts[i].position.y - 5) && (player.position.y <= Hearts[i].position.y + 5) )
				{
					var tempObjectHolder = Hearts[i];
					Hearts.splice(i, 1);
					scene.remove(tempObjectHolder);
					HeartsCollected++;
					HeartsCollectedOverall++;
					datanode.pause();
					datanode.currentTime = 0;
					datanode.play();
					break;
				}
			}
		}
	}
	// Simultaneous press of S W & A, or UP & LEFT
	else if( ( keyboard.pressed("left1") || keyboard.pressed("left2") ) &&
			 ( keyboard.pressed("forward1") || keyboard.pressed("forward2") ) )
	{
		rotateCamera("left");
		switch( moveCamera( player.position.x, player.position.y, -1, 1 ) )
		{
			case "clear": // No obstructions
			{
				break;
			}
			case "collision": // Obstruction: using old or modified coordinates.
			{
				// Keep player's physical form in-sync with camera position.
				//player.position.x = camera.position.x;//$
				//player.position.y = camera.position.y;//$
				//player.position.z = camera.position.z;
				player.position.x = player.position.x;//4
				player.position.y = player.position.y;//$
				player.position.z = player.position.z;
				break;
			}
			default:
			{
				break;
			}
		}
		for(var i = 0; i < Hearts.length; i++)
		{
			if( (player.position.x >= Hearts[i].position.x - 5) && (player.position.x <= Hearts[i].position.x + 5) )
			{
				if( (player.position.y >= Hearts[i].position.y - 5) && (player.position.y <= Hearts[i].position.y + 5) )
				{
					var tempObjectHolder = Hearts[i];
					Hearts.splice(i, 1);
					scene.remove(tempObjectHolder);
					HeartsCollected++;
					HeartsCollectedOverall++;
					datanode.pause();
					datanode.currentTime = 0;
					datanode.play();
					break;
				}
			}
		}
	}
	// Simultaneous press of S S & D, or DOWN & RIGHT
	else if( ( keyboard.pressed("right1") || keyboard.pressed("right2") ) &&
			 ( keyboard.pressed("back1") || keyboard.pressed("back2") ) )
	{
		rotateCamera("right");
		switch( moveCamera( player.position.x, player.position.y, 1, -1 ) )
		{
			case "clear": // No obstructions
			{
				break;
			}
			case "collision": // Obstruction: using old or modified coordinates.
			{
				// Keep player's physical form in-sync with camera position.
				//player.position.x = camera.position.x;//$
				//player.position.y = camera.position.y;//$
				//player.position.z = camera.position.z;
				player.position.x = player.position.x;//4
				player.position.y = player.position.y;//$
				player.position.z = player.position.z;
				break;
			}
			default:
			{
				break;
			}
		}
		for(var i = 0; i < Hearts.length; i++)
		{
			if( (player.position.x >= Hearts[i].position.x - 5) && (player.position.x <= Hearts[i].position.x + 5) )
			{
				if( (player.position.y >= Hearts[i].position.y - 5) && (player.position.y <= Hearts[i].position.y + 5) )
				{
					var tempObjectHolder = Hearts[i];
					Hearts.splice(i, 1);
					scene.remove(tempObjectHolder);
					HeartsCollected++;
					HeartsCollectedOverall++;
					datanode.pause();
					datanode.currentTime = 0;
					datanode.play();
					break;
				}
			}
		}
	}
	// Simultaneous press of S & A, or DOWN & LEFT
	else if( ( keyboard.pressed("left1") || keyboard.pressed("left2") ) &&
			 ( keyboard.pressed("back1") || keyboard.pressed("back2") ) )
	{
		rotateCamera("left");
		switch( moveCamera( player.position.x, player.position.y, 1, -1 ) )
		{
			case "clear": // No obstructions
			{
				break;
			}
			case "collision": // Obstruction: using old or modified coordinates.
			{
				// Keep player's physical form in-sync with camera position.
				//player.position.x = camera.position.x;//$
				//player.position.y = camera.position.y;//$
				//player.position.z = camera.position.z;
				player.position.x = player.position.x;//4
				player.position.y = player.position.y;//$
				player.position.z = player.position.z;
				break;
			}
			default:
			{
				break;
			}
		}
		for(var i = 0; i < Hearts.length; i++)
		{
			if( (player.position.x >= Hearts[i].position.x - 5) && (player.position.x <= Hearts[i].position.x + 5) )
			{
				if( (player.position.y >= Hearts[i].position.y - 5) && (player.position.y <= Hearts[i].position.y + 5) )
				{
					var tempObjectHolder = Hearts[i];
					Hearts.splice(i, 1);
					scene.remove(tempObjectHolder);
					HeartsCollected++;
					HeartsCollectedOverall++;
					datanode.pause();
					datanode.currentTime = 0;
					datanode.play();
					break;
				}
			}
		}
	}
	// Pressed D, or RIGHT
	else if( keyboard.pressed("right1") || keyboard.pressed("right2") )
	{
		rotateCamera("right");
	}
	// Pressed A, or LEFT
	else if( keyboard.pressed("left1") || keyboard.pressed("left2") )
	{
		rotateCamera("left");
	}
	// Pressed W, or UP
	else if( keyboard.pressed("forward1") || keyboard.pressed("forward2") )
	{
		switch( moveCamera( player.position.x, player.position.y, -1, 1 ) )
		{
			case "clear": // No obstructions
			{
				break;
			}
			case "collision": // Obstruction: using old or modified coordinates.
			{
				// Keep player's physical form in-sync with camera position.
				player.position.x = player.position.x;//4
				player.position.y = player.position.y;//$
				player.position.z = player.position.z;
				break;
			}
			default:
			{
				break;
			}
		}
		for(var i = 0; i < Hearts.length; i++)
		{
			if( (player.position.x >= Hearts[i].position.x - 5) && (player.position.x <= Hearts[i].position.x + 5) )
			{
				if( (player.position.y >= Hearts[i].position.y - 5) && (player.position.y <= Hearts[i].position.y + 5) )
				{
					var tempObjectHolder = Hearts[i];
					Hearts.splice(i, 1);
					scene.remove(tempObjectHolder);
					HeartsCollected++;
					HeartsCollectedOverall++;
					datanode.pause();
					datanode.currentTime = 0;
					datanode.play();
					break;
				}
			}
		}
	}
	// Pressed S, or DOWN
	else if( keyboard.pressed("back1") || keyboard.pressed("back2") )
	{
		switch( moveCamera( player.position.x, player.position.y, 1, -1 ) )
		{
			case "clear": // No obstructions
			{
				break;
			}
			case "collision": // Obstruction: using old or modified coordinates.
			{
				// Keep player's physical form in-sync with camera position.
				//player.position.x = camera.position.x;//4
				//player.position.y = camera.position.y;//$
				//player.position.z = camera.position.z;
				player.position.x = player.position.x;//4
				player.position.y = player.position.y;//$
				player.position.z = player.position.z;
				break;
			}
			default:
			{
				break;
			}
		}
		for(var i = 0; i < Hearts.length; i++)
		{
			if( (player.position.x >= Hearts[i].position.x - 5) && (player.position.x <= Hearts[i].position.x + 5) )
			{
				if( (player.position.y >= Hearts[i].position.y - 5) && (player.position.y <= Hearts[i].position.y + 5) )
				{
					var tempObjectHolder = Hearts[i];
					Hearts.splice(i, 1);
					scene.remove(tempObjectHolder);
					HeartsCollected++;
					HeartsCollectedOverall++;
					datanode.pause();
					datanode.currentTime = 0;
					datanode.play();
					break;
				}
			}
		}
	}
	//To specify the relative position of camera wrt to the player....
	var relativeCameraOffset = new THREE.Vector3(0, WALL_HEIGHT/2 , 10);
	//var relativeCameraOffset = new THREE.Vector3( 0, WALL_HEIGHT/2, 10);
	var cameraOffset = relativeCameraOffset.applyMatrix4(player.matrixWorld);
	camera.position.x = cameraOffset.x;
	camera.position.y = cameraOffset.y;
	camera.position.z = cameraOffset.z;
	camera.lookAt(player.position);	
	//camera.lookAt(scene.position);
}
function turnOffModal()
{
	if(LEVEL > 1)//$4
	{
		if( (player.position.x >= computer.position.x - 5) && (player.position.x <= computer.position.x + 5) &&
			(player.position.y >= computer.position.y - 5) && (player.position.y <= computer.position.y + 5) )
		{
			window.location.reload();
		}
	}
	else if(gameFlag == false)
	{
		window.location.reload();
	}
	
	if(updateCounter >= 91)
	document.getElementById("modal").style.display = "none";
	modalFlag = false;
}
function turnOnModal()
{
	document.getElementById("modal").style.display = "block";
	modalFlag = false;
}