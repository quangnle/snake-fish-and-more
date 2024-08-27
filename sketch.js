let snake;
let fish;
function setup(){
    createCanvas(600, 400);
    snake = new Snake(200, 300, 15, 20);    
    //fish = new Fish(300, 200);
}

function draw(){
    background(51);
    snake.follow(mouseX, mouseY);
    snake.draw();    
    // fish.follow(mouseX, mouseY);
    // fish.draw();
}