class Slingshot 
{
    constructor(objectA,positionB)  
    {
        var Options = {
            bodyA: objectA,
            pointB: positionB,  
            length: 10,
            stiffness: 0.04
        }

        this.Sling = Constraint.create(Options)
        World.add(world,this.Sling)
        this.sling1 = loadImage("sprites/sling1.png")
        this.sling2 = loadImage("sprites/sling2.png")
        this.sling3 = loadImage("sprites/sling3.png")
    }
    
    
    fly()
    {

        this.Sling.bodyA = null

    }


    display()
    {   
        image(this.sling1, 200, 73, 40, 150)
        image(this.sling2, 170, 62, 40, 100)
        // if condition to ensure the line is drawn only if bodyA's value is not null. (i.e., only when the mouse is dragged)
        push()
        if(this.Sling.bodyA) // checks whether bodyA has a value. 
        {
            var pA = this.Sling.bodyA.position; // pA.x , pA.y
            var pB = this.Sling.pointB; // pB.x, pB.y
            // line(x1,y1,x2,y2)
            stroke(48, 22, 8)
            strokeWeight(4)
            line(pA.x - 12, pA.y, pB.x - 10, pB.y)
            line(pA.x - 12, pA.y, pB.x + 20, pB.y)
        }
        pop()

        
    }

    attach(object)
    {
        this.Sling.bodyA = object

    }

}

