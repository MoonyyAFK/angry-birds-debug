/*
Data Types:

Numeric data type
var num = 0; 

String data type 
var name = "Khushi";

Boolean Data type - true or false
var bool = true

"0" -> 0    // string to numeric
0 -> "0"    // numeric to string

true -> 1   // boolean to numeric
false -> 0  // boolean to numeric

1 -> true // numeric to boolean
0 -> false // numeric to boolean 

ARRAYS 
Each piece of information written in an array is called the element of the array. Elements are separated by commas

var arr1 = [1,2,3,4,5]       
var arr2 = ["Khushi",43,true, "Ashmita", 56, false]

Index an array - access the elements of an array through position number of elements
Note: the first element of an array has an index position of 0. 

console.log(arr2[5]);

var arr3 = [arr1, arr2, ["x", "y", "z"], 0, 1, true]
console.log(arr3[1][0])

arr3.push("laptop") // push is used to add an element to the end of the array

arr3.pop() // pop is used to delete the last element of the array



*/

// Namespacing 
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var chain;
var engine, world;
var box1, pig1;
var gamestate = "onSling"
var rope;
var backgroundImg;
var score = 0;

function preload(){
    // getTime();
    backgroundImg = loadImage("sprites/bg.png");            
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    
    ground = new Ground(600,height,1200,20)
    platform = new Ground(150, 305, 300, 170);
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(100,100);

    rope = new Slingshot(bird.body,{x:210, y:90});
   
   // boxA = new Box(250,250,50,50);

    /*
    // JSON 
    var Option = {
        bodyA: bird.body,
        bodyB: boxA.body,
        length: 10,
        stiffness: 0.2
    }

    chain = Constraint.create(Option);
    World.add(world,chain)
    */
    
}

function draw()
{
   if(backgroundImg)    // 
   {
        background(backgroundImg);
   }

    textSize(15)
    fill("yellow")
    text("Points: "+score,1000,70)




    Engine.update(engine);
    //console.log(box2.body.position.x);
   // console.log(box2.body.position.y);
   // console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
    platform.display();
    //boxA.display();
    rope.display();
    bird.display();

    
    
    //line(bird.body.position.x, bird.body.position.y, boxA.body.position.x, boxA.body.position.y)
}

// Position of the bird should follow the mouse when the mouse is clicked over the bird and dragged
// Matter.Body.setPosition() inputs: 1) the body or the object which needs to be moved 2) x, y position
// !== means not equal to
function mouseDragged()
{
    if(gamestate!=="launched") {
        Matter.Body.setPosition(bird.body, {x: mouseX, y: mouseY})
    }
    

}


// We need to release the bird from the constraint. 
function mouseReleased()
{
    rope.fly()
    gamestate = "launched"
}

function keyPressed() {
    if(keyCode === 32) {
        bird.path = []
        Matter.Body.setPosition(bird.body, {x: 200, y: 73});
        rope.attach(bird.body)

    }

}

/*
javascript executes commands synchronously which means that it will execute one line after another without waiting 
for the previous line to be fully executed. Making an api call involves making network requests and hence requires 
some time. Therefore, we need to make getTime function an asynchronous function so that the code will wait for the 
api call to be completed before moving on to the next line.
*/

async function getTime() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Dushanbe")
    var responseJson = await response.json()
    console.log(responseJson.datetime)
    var datetime = responseJson.datetime
    var hour = datetime.slice(11,13); 

    // condition to check hour of the day 
    // >= means greater than or equal to; <= means less than or equal to   || && 
    if(hour >= 6 && hour <=18 )         
    {
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);

}

