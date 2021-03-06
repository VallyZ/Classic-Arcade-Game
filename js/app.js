//select a random number between min max
function random(min, max) {
  return Math.random() * (max - min) + min;
}
// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y - 43;
    this.speed = random(200, 400);
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    if (this.x > 6 * 101) {
      this.x = -101;
      this.speed = random(200, 400);
    }
    if (Math.abs(this.x - player.x) < 83 &&
      Math.abs(this.y - player.y) < 83) {
      player.reset();
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.reset();
  }

  update() {
    this.x = this.col * 101;
    this.y = this.row * 83 - 43;

    if (this.col < 0) {
      this.col = 0;
    }

    if (this.col > 4) {
      this.col = 4;
    }

    if (this.row > 5) {
      this.row = 5;
    }
    if (this.row == 0) {
      alert('You Won');
      this.reset();
    }
  };
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  handleInput(key) {
    switch (key) {
      case 'left':
        this.col--;
        break;
      case 'right':
        this.col++;
        break;
      case 'up':
        this.row--;
        break;
      case 'down':
        this.row++;
        break;
    }
  };
  reset() {
    this.col = 2;
    this.row = 5;
    this.x = this.col * 101;
    this.y = this.row * 83 - 43;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const numEnemies = 3;
const allEnemies = [];
for (let i = 0; i < numEnemies; i++) {
  allEnemies.push(new Enemy(i * 101, (i + 1) * 83));
}
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});