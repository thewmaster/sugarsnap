// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = 800;
canvas.height = 600;

// Basket object
let basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 5,
    dx: 0
};

// Falling objects array
let objects = [];

// Object class
class FallingObject {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = Math.random() * 3 + 2; // Random speed between 2 and 5
    }

    // Draw the falling object
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Update the falling object's position
    update() {
        this.y += this.speed;
        this.draw();
    }
}

// Create random falling objects at regular intervals
function createFallingObject() {
    const radius = Math.random() * 15 + 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const color = 'red';
    objects.push(new FallingObject(x, 0, radius, color));
}

// Draw the basket
function drawBasket() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

// Update the basket position
function updateBasket() {
    basket.x += basket.dx;

    // Prevent basket from going out of bounds
    if (basket.x < 0) basket.x = 0;
    if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;

    drawBasket();
}

// Detect collision between falling objects and the basket
function detectCollision() {
    objects.forEach((object, index) => {
        if (
            object.y + object.radius >= basket.y && // Object touches the basket's height
            object.x >= basket.x && object.x <= basket.x + basket.width
        ) {
            objects.splice(index, 1); // Remove object after it's caught
        }
    });
}

// Update the game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Create new falling objects
    if (Math.random() < 0.05) createFallingObject(); // 5% chance to create a new object each frame

    // Update and draw falling objects
    objects.forEach(object => {
        object.update();
    });

    // Detect collisions with the basket
    detectCollision();

    // Update the basket's position
    updateBasket();

    // Call the update function recursively
    requestAnimationFrame(update);
}

// Control the basket with arrow keys
function moveBasket(event) {
    if (event.key === 'ArrowLeft') {
        basket.dx = -basket.speed;
    } else if (event.key === 'ArrowRight') {
        basket.dx = basket.speed;
    }
}

// Stop the basket movement
function stopBasket(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        basket.dx = 0;
    }
}

// Event listeners for keypress
document.addEventListener('keydown', moveBasket);
document.addEventListener('keyup', stopBasket);

// Start the game loop
update();
