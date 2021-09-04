class Boat{
   
    constructor(x, y, w, h, boatPos, boatAnimation)
    {
        var boat_options = {
        friction: 1,
        density:1,
        restitution:0.75
        }
        this.body  = Bodies.rectangle(x, y, w, h, boat_options)
        this.w = w
        this.h = h

        this.animation = boatAnimation;
        this.speed = 0.047;
        this.boatPosition = boatPos;
        this.image = loadImage("assets/boat.png")  
        World.add(myWorld, this.body)
     }

     animate()
     {

          this.speed  = this.speed + 0.047;
     }

     display(){

         var pos = this.body.position;

         var index = floor(this.speed % 4);

         console.log(index); 
        //0, 1, 2, 3
        /* floor = roundoff value to lowest integer
           3.78 = 3
           3.1 = 3
*/
         push();

         imageMode(CENTER)
         image(this.animation[index], pos.x, this.boatPosition , this.w, this.h )
         pop();
     }

    // boats[j].remove(j);
      remove(index)
      {
            this.animation = brokenBoatAnimation;
            this.speed = 0.047
            this.width = 300;
            this.height = 300;
            //flag
            this.isBroken = true
            //fading effect

            setTimeout(()=>
            {
              Matter.World.remove(myWorld, boats[index].body);
              boats.splice(index, 1)
            }, 2000 );
           
            
      }


    }





