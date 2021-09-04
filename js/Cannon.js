//cannon is not a physics body

class Cannon{
  
    constructor(x,y,width,height,angle)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
     
        this.angle = angle;
    }

 
    display()
    {

        if(keyIsDown(RIGHT_ARROW) && this.angle < 0.20 )
        {
            this.angle = this.angle + 0.018
        }

        if(keyIsDown(LEFT_ARROW)&& this.angle > -1.27)
        {
            this.angle = this.angle - 0.018
        }
       console.log(this.angle);

        fill("grey")
        push();
        translate(this.x, this.y)
        rotate(this.angle);
        rect(-22,-10,this.width+17, this.height);
        pop();
        arc(this.x-35, this.y+85, 170, 240, PI, TWO_PI);
        noFill();
    }

}