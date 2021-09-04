 const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Render = Matter.Render;

var myEngine, myWorld;

var tower, towerImg, ground, cannon;
var backgroundImg;
var cannonBallImg;
var boat
var balls = [];
var boats = [];

var boatAnimation = [];
var boatSpritesheet, boatSpritedata;
var boatFrames;

var brokenboatSpritesheet, brokenboatSpritedata;
var brokenBoatAnimation = [];
var brokenBoatframes;

var waterSplashAnimation = [];
var splashData, splashSpritesheet;
var splashFrames;
function preload()
{
  towerImg = loadImage("assets/tower.png");
  backgroundImg = loadImage('assets/background.gif');
  cannonBallImg = loadImage("assets/cannonball.png");
  boatSpritesheet = loadImage('assets/boat/boat.png');
  boatSpritedata = loadJSON('assets/boat/boat.json');
    brokenboatSpritedata = loadJSON('assets/boat/broken_boat.json')
    brokenboatSpritesheet = loadImage("assets/boat/broken_boat.png")
    splashData = loadJSON("water_splash/water_splash.json")
splashSpritesheet = loadImage("water_splash/water_splash.png")
}

function setup(){
    createCanvas(1200,600);
    myEngine = Engine.create();
    myWorld = myEngine.world;

    var render = Render.create({

      element: document.body,
      engine: myEngine,
      options: {

        width: 1200,
        height: 600,
        wireframes: false
      }
    });

    Render.run(render)

    

    tower = new Tower(150, 380, 190, 330);

    ground = new Ground(600, height-1, width*2,1);
    angle = -PI/4
    cannon = new Cannon(185, 140, 90, 56,angle);

  //  boat = new Boat(width-300, height-120, 200, 200,-100 )
   // cannonBall = new CannonBall(cannon.x, cannon.y, 40);
    

      boatFrames = boatSpritedata.frames;

      for(var i=0; i<boatFrames.length; i++)
      {

           var pos = boatFrames[i].position;

           var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h)
            boatAnimation.push(img);
          }


          brokenBoatframes = brokenboatSpritedata.frames;

          for(var i = 0; i<brokenBoatframes.length; i++ )
          {
          var pos = brokenBoatframes[i].position;
          var img = brokenboatSpritesheet.get(pos.x, pos.y, pos.w, pos.h)
          brokenBoatAnimation.push(img)
          }

          
          splashFrames = splashData.frames
          for (var i = 0; i< splashFrames.length; i++)
          {
            var pos= splashFrames[i].position

            var img = splashSpritesheet.get(pos.x, pos.y, pos.w, pos.h)
            waterSplashAnimation.push(img)
          }
}


function draw(){
    background(backgroundImg);
    Engine.update(myEngine);
   // cannonBall.display();

   //created an array [c1, c2, c3,c4]; for the cannonball
   for(var i =0; i<balls.length; i++)
   {
    //calling the function
      showCannonBalls(balls[i] , i);

      //C26 for the collision
      //for loop for pirates
      for(var j = 0; j< boats.length; j++)
      {

        //atleast 1 ball has to be there
          if(balls[i] !== undefined  && boats[j] !== undefined)
          {

              //Matter.SAT.colides.collided --> returns either true or false 
              var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
              if(collision.collided)
              {

                  if(!boats[j].isBroken && !ball[i].isSink)
                  {
                      boats[j].remove(j);
                      j--;

                  }   

                      World.remove(myWorld, balls[i].body);
                      //balls.splice(i, 1);
                      delete balls[i]
                      i--;

                
              }
          
            }

      }


   }


    tower.display();
    ground.display();
    cannon.display();
 
    /*
      Body.setVelocity(boat.body ,{
        x: -0.8,
        y:0 
      })                          

    boat.display()

    */

    showBoats();
   
}

//defining 
function showCannonBalls(ball, index)
{
    
    if(ball)
    {

    
        ball.display();
        ball.animate();


        if(ball.body.position.x >= width | ball.body.position.y >= height -50)
        {


         // ball.isSink = true;
            if(!ball.isSink)
            {
               ball.remove(index);


            //World.remove(myWorld, ball.body);
           // balls.splice(index,1);
            }
        }

     }  
}

function keyPressed()
{
  if(keyCode === DOWN_ARROW)
  {
    var cannonBall = new CannonBall(cannon.x +10, cannon.y+10, 40);
    balls.push(cannonBall);
  }
}

function keyReleased()
{
   if(keyCode === DOWN_ARROW)
   {

    console.log("Shoot")
      //cannonBall.shoot();
      balls[balls.length-1].shoot();
   }
}

//user define
function showBoats()
{
    //boats[b1]   length array: no of elements inside

    //atleast 1 boat is present
    if(boats.length >0)
    {

        if(boats.length < 4 && boats[boats.length -1].body.position.x < width -300)
        {
            var position = [height-140, height-210, height-180];
            var position = random(position);
            var boat = new Boat(width, height-100, 200, 200, position,boatAnimation );
            boats.push(boat);
        }

        for(var i=0; i<boats.length; i++)
        {
          Body.setVelocity(boats[i].body, {x:-0.87, y:0} );
          boats[i].display();
          boats[i].animate();
        }


    }

    else{
     //1st boat

       boat = new Boat(width, height -100, 200, 200, height-110, boatAnimation);
       boats.push(boat);
      }

}
