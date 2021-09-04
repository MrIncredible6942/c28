class CannonBall

{
    constructor(x,y,r)
    {
        var ball_options = {
            restitution:0.9,
            isStatic:true,
            density: 1,
            friction:1
        };
       this.image = loadImage("assets/cannonball.png") ;
      this.body = Bodies.circle(x, y, r, ball_options);
      this.r = r;
      this.trajectory = [];

      //flag value
      this.isSink = false;
      this.speed = 0.049;
      this.animation = [this.image];

      World.add(myWorld, this.body);
     }

animate()
{
  
  this.speed  += 0.049;

 // this.speed = this.speed + 0.049;

}

remove(index)
{
        this.isSink = true;
        Body.setVelocity(this.body, {x:0, y: 0});

        this.animation = waterSplashAnimation;
        this.speed = 0.049;
        this.r = 150;

        setTimeout(()=>{
          Matter.World.remove(myWorld, this.body);
          delete balls[index];

        }, 1000);

}

   shoot()
    {

        var velocity = p5.Vector.fromAngle(cannon.angle);
        velocity.mult(19);
        Body.setStatic(this.body, false)
        Body.setVelocity(this.body, {x: velocity.x, y: velocity.y})
    }

   display()
   {

        var pos = this.body.position;
        var angle = this.body.angle;

        var index = floor(this.speed % this.animation.lenth)
        
        push();
        translate(pos.x, pos.y);
        rotate(angle)
        imageMode(CENTER);
        image(this.animation[index],0, 0, this.r, this.r);
        pop();

        if(this.body.velocity.x >0 &&  this.body.position.x >270 && this.isSink ===false)
        {
            var position = [this.body.position.x, this.body.position.y]
            this.trajectory.push(position);
          }


        for(var i=0; i<this.trajectory.length; i++)
        {
          image(this.image,this.trajectory[i][0], this.trajectory[i][1], 5, 5)
        }  
   }
}