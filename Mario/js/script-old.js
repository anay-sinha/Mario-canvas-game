const gameCanvas=document.querySelector("#gameCanvas");
gameCanvas.width=window.innerWidth;
gameCanvas.height=window.innerHeight;
gameCanvas.style.background="yellow";

const context=gameCanvas.getContext("2d");

// //context.fillRect(100,100,50,100);

// context.fillStyle="red";
// context.strokeStyle="red";
// //context.strokeRect(100,100,50,100);

// context.beginPath();
// context.arc(100,100,50,0,Math.PI*2);
// context.stroke();
// //context.closePath();

// context.moveTo(300,300);
// context.lineTo(400,500);
// context.stroke();
// context.closePath();
// context.beginPath();
// context.arc(300,100,50,0,Math.PI*2);
// context.stroke();

// context.font="50px Arial";
// context.strokeText("Hello",100,100);


class Circle{
   //x=10;
   constructor(x,y,radius,speed)
   {
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.speed=speed;
   }
   display()
   {
    this.x=10;

    console.log(this.x);
   }
   read(x,y,radius)
   {
    this.x=x;
    this.y=y;
    this.radius=radius
   }
   draw()
   {
    context.beginPath();
    context.arc(this.x+this.speed,this.y+this.speed,this.radius,0,Math.PI*2);
    context.stroke();
    context.closePath();


   }

}

//Circle c; Compile time object
//Circle *c=new Circle(); Runtime

// //Circle c=new Circle();
// let c=new Circle();
// //console.log(c.x);
// //c.display();
// c.draw();

// let c1=new Circle();
// //console.log(c.x);
// //c.display();
// c1.draw();

// let c=new Circle();
// c.read(100,100,50);
// c.draw();


// let c1=new Circle();
// c1.read(200,100,50);
// c1.draw();


// let c=new Circle(100,100,50);
// c.draw();


// let c1=new Circle(100,200,50);
// c1.draw();

// let circles=[];

// for(i=1;i<=10;i++)
// {
//     //let c=new Circle(100+i*10,100+i*10,50);
//     let x=Math.random()*window.innerWidth;
//     let y=Math.random()*window.innerHeight;

//     let c=new Circle(x,y    ,50);
//     circles.push(c);

//     //c.draw();

// }


// circles.forEach((circle)=>{
//     circle.draw();

// })
let c=new Circle(100,100,50,0);
c.draw();

// console.log("first");
// setTimeout(test,0);
// console.log("Second");
// function test()
// {
//     console.log("test called");
// }

//setInterval(animate,100);
function animate()
{
    requestAnimationFrame(animate);

    context.clearRect(0,0,window.innerWidth,window.innerHeight);

    c.speed+=1;
    c.draw();

}
animate();