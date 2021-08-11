function load() {
  canvas = document.getElementById('canvas');
  if (canvas.getContext){
    ctx = canvas.getContext('2d');
    this.gridSize = 20;
    start();
  } else {
    alert("Sorry, but Internet Expolorer does not support the canvas tag. Please use another web browser.");
  }
}

function start(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  this.currentPosition = {'x':100, 'y':100};
  this.count = 0;
  this.powerUp = 0;
  this.powerUpCount = 0;
  this.invinsibleArray = [];
  snakeBody = [];
  snakeLength = 3;
  startGame = false;
  updateScore();
  makeFoodItem();
  drawSnake();
  direction = 'right';
  started = false;
  // play();  
}

function restart(){
  pause();
  start();
}

function pause(){
  clearInterval(interval);
}

function play(){
  interval = setInterval(moveSnake,110);
  started = true;
}

function drawSnake() {
  if (snakeBody.some(hasEatenItself) && this.powerUp !== 2) {
    gameOver();
    return false;
  } else if (snakeBody.some(hasEatenItself) && this.powerUp === 2) {
    this.invinsibleArray.push([currentPosition['x'], currentPosition['y']].toString());
  }
  snakeBody.push([currentPosition['x'], currentPosition['y']]);
  if (this.powerUp === 0) {
    ctx.fillStyle = "rgb(0,200,0)";
  } else if (this.powerUp === 1) {
    ctx.fillStyle = "rgb(255,0,129)";
  } else if (this.powerUp === 2) {
    ctx.fillStyle = "rgb(255,165,0)";
  } else if (this.powerUp === 3) {
    ctx.fillStyle = "rgb(51,255,255)";
  } else {
    ctx.fillStyle = "rgb(0,102,0)";
  }
  ctx.fillRect(currentPosition['x'] + 1 , currentPosition['y'] + 1, gridSize - 2, gridSize - 2);
  if (snakeBody.length > snakeLength) {
    itemToRemove = snakeBody.shift();
    var index = this.invinsibleArray.indexOf(itemToRemove.toString());
    if (index !== -1) {
      console.log(this.invinsibleArray);
      console.log(itemToRemove);
      console.log("test");
    }
    (index > -1) ? this.invinsibleArray.splice(index, 1) : ctx.clearRect(itemToRemove[0] - 0.1, itemToRemove[1] - 0.1, gridSize, gridSize);
  }
  if (this.count === 100) {
    spawnPowerUp();
  }  
  if (currentPosition['x'] == suggestedPoint[0] && currentPosition['y'] == suggestedPoint[1]) {
    makeFoodItem();
    snakeLength += 1;
    this.powerUp === 4 ? snakeLength += 1 : null;
    updateScore();
  }
  if (this.count > 100 && currentPosition['x'] == powerUpPoint[0] && currentPosition['y'] == powerUpPoint[1]) {
    this.powerUp = (Math.floor(Math.random() * 4) + 1);
    powerUpPoint = [-1,-1];
    console.log(this.powerUp);
  }
  if (this.powerUp > 0) {
    pU = this.powerUp;
    if (pU === 1 && this.powerUpCount === 0) {
      clearInterval(interval);
      interval = setInterval(moveSnake, 90);
    } else if (pU === 2 && this.powerUpCount === 0) {
      this.invinsibleArray = [];
    } else if (pU === 3 && this.powerUpCount === 0) {
      clearInterval(interval);
      interval = setInterval(moveSnake, 130)
    } else {
      null;
    }
    if (this.powerUpCount >= 225) {
      clearInterval(interval)
      interval = setInterval(moveSnake, 110);
      this.powerUp = 0;
      this.powerUpCount = 0;
      this.count = 0;
    } else {
      this.powerUpCount += 1;
    }
  }
}

function includesItemToRemove(element, index, array) {
  return element[0] === itemToRemove[0] && element[1] === itemToRemove[1];
}

function leftPosition(){
 return currentPosition['x'] - gridSize;  
}

function rightPosition(){
  return currentPosition['x'] + gridSize;
}

function upPosition(){
  return currentPosition['y'] - gridSize;  
}

function downPosition(){
  return currentPosition['y'] + gridSize;
}

function moveUp(){
  if (upPosition() >= 0) {
    executeMove('up', 'y', upPosition());
  } else {
    gameOver();
  }
}

function moveDown(){
  if (downPosition() < canvas.height) {
    executeMove('down', 'y', downPosition());    
  } else {
    gameOver();
  }
}

function moveLeft(){
  if (leftPosition() >= 0) {
    executeMove('left', 'x', leftPosition());
  } else {
    gameOver();
  }
}

function moveRight(){
  if (rightPosition() < canvas.width) {
    executeMove('right', 'x', rightPosition());
  } else {
    gameOver();
  }
}

function executeMove(dirValue, axisType, axisValue) {
  direction = dirValue;
  currentPosition[axisType] = axisValue;
  this.count += 1;
  drawSnake();
}

function makeFoodItem(){
  suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
  if (snakeBody.some(hasFoodPoint)) {
    makeFoodItem();
  } else {
    ctx.fillStyle = "rgb(255,51,51)";
    ctx.fillRect(suggestedPoint[0] + 2, suggestedPoint[1] + 2, gridSize - 4, gridSize - 4);
  };
}

function spawnPowerUp(){
  powerUpPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
  if (snakeBody.some(hasPowerUpPoint)) {
    spawnPowerUp();
  } else {
    ctx.fillStyle = "rgb(192,192,192)";
    ctx.fillRect(powerUpPoint[0] + 3, powerUpPoint[1] + 3, gridSize - 6, gridSize - 6);
  };
}

function hasFoodPoint(element, index, array) {
  return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}

function hasPowerUpPoint(element, index, array) {
  return (element[0] == powerUpPoint[0] && element[1] == powerUpPoint[1]);
}

function hasEatenItself(element, index, array) {
  return (element[0] == currentPosition['x'] && element[1] == currentPosition['y']);  
}

function gameOver(){
  var score = (snakeLength - 3)*25;
  pause();
  alert("Game Over. Your score was "+ score);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  started = false;
  restart();
  document.getElementById("start-screen").style.display = "block";
}

function updateScore(){
  var score = (snakeLength - 3)*25;
  document.getElementById('score').innerText = score;
}

document.onkeydown = function(event) {
  var keyCode; 
  if(event == null)
  {
    keyCode = window.event.keyCode; 
  }
  else 
  {
    keyCode = event.keyCode; 
  }
 
  switch(keyCode)
  {
    case 32:
      if (started === false) {
        document.getElementById("start-screen").style.display = "none";
        play();
      }
    case 37:
    case 65:
      if (direction != "right" && started != false){
        moveLeft();
      }
      break;
     
    case 38:
    case 87:
      if (direction != "down" && started != false){
        moveUp();
      }
      break; 
      
    case 39:
    case 68:
      if (direction != "left" && started != false){
        moveRight();
      }
      break; 
    
    case 40:
    case 83:
      if (direction != "up" && started != false){
        moveDown();
      }
      break; 
    
    default: 
      break; 
  } 
}

function moveSnake(){
  switch(direction){
    case 'up':
      moveUp();
      break;

    case 'down':
      moveDown();
      break;
      
    case 'left':
      moveLeft();
      break;

    case 'right':
      moveRight();
      break;
  }
}