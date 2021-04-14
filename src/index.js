function load() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
      ctx = canvas.getContext('2d');
      gridSize = 20;
      start();
    } else {
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}

function start() {
    this.currentPosition = {'x': 100, 'y': 100};
    drawSnake();
    direction = 'right'
    setInterval(moveSnake, 100)
}

function drawSnake() {
    ctx.fillStyle = "rgb(0, 200, 0)";
    ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
}

function moveSnake(){
    switch(direction){
      case 'up':
        currentPosition['y'] = currentPosition['y'] - gridSize;
        drawSnake();
        break;
  
      case 'down':
        currentPosition['y'] = currentPosition['y'] + gridSize;
        drawSnake();
        break;
  
      case 'left':
        currentPosition['x'] = currentPosition['x'] - gridSize;
        drawSnake();
        break;
  
      case 'right':
        currentPosition['x'] = currentPosition['x'] + gridSize;
        drawSnake();
        break;
    }
}

document.onkeydown = function(event) {
  var key;

  if(event == null)
  {
    key = window.event.keyCode;
  }
  else
  {
    key = event.keyCode;
  }

  switch(key) //take in key code and move in according direction
    {
    case 37:
        direction = 'left';
        currentPosition['x'] = currentPosition['x'] - gridSize;
        ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
        break;

    case 38:
        direction = 'up';
        currentPosition['y'] = currentPosition['y'] - gridSize;
        ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
        break;

    case 39:
        direction = 'right';
        currentPosition['x'] = currentPosition['x'] + gridSize;
        ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
        break;

    case 40:
        direction = 'down'
        currentPosition['y'] = currentPosition['y'] + gridSize;
        ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
        break;

    default:
        break;
    }
}