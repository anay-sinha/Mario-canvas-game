//1. Project Setup
// Html->canvas, javascript ->references,
// canvas set (width,height,background-color)
//obtain the context
//2. Player
//3. FAlling , gravity
//4. Movement->optimize
//5. Platforms
//6. Collision
//7. Multiple Platforms
//8. Scrolling -> plalform
//9. Win situation
//10. Pitfall

const speed = 5;
let offset = 0;

const backImage = new Image();
backImage.src = "./images/background.png";

const hillsImage = new Image();
hillsImage.src = "./images/hills.png";

const plaformBase = new Image();
plaformBase.src = "./images/platform.png";

const plaformSmall = new Image();
plaformSmall.src = "./images/platformSmallTall.png";

const playerStandRight = new Image();
playerStandRight.src = "./images/spriteStandRight.png";

const playerStandLeft = new Image();
playerStandLeft.src = "./images/spriteStandLeft.png";

const playerRunRight = new Image();
playerRunRight.src = "./images/spriteRunRight.png";

let images = [backImage, hillsImage, plaformBase, plaformSmall,playerStandRight,playerRunRight,playerStandLeft];
const totalImages = images.length;
let gameStart = false;
let count = 0;

images.forEach((image) => {
    image.addEventListener("load", () => {
        count++;
    })
})




const gameCanvas = document.querySelector("#gameCanvas");
gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;
gameCanvas.style.background = "yellow";
const context = gameCanvas.getContext("2d");
const gravity = 0.5;
const keys = {
    right: false,
    left: false
}
//2. Player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 300
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 66;
        this.frames=0;
        this.height = 150;
        this.image=playerStandRight;
        this.cropWidth=177;


    }
    draw() {
        // context.fillStyle = "white";
        // context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.cropWidth*this.frames,
            0,
            this.cropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height);

    }
    update() {
        this.frames++;
        if(this.frames>59 && this.image==playerStandRight)
            this.frames=0

        if(this.frames>29 && this.image==playerRunRight)
            this.frames=0

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= window.innerHeight) {
            this.velocity.y = 0;
            window.location.reload();

        }
        else
            this.velocity.y += gravity;




        this.draw();
    }

}

// class Platform{
//     constructor(x,y,width,height,image)
//     {
//         this.position={
//             x:x,
//             y:y
//         }
//         this.width=width;
//         this.height=height;
//         this.image=image;
//     }
//     draw()
//     {
//         context.fillStyle="red";
//         context.fillRect(this.position.x,this.position.y,this.width,this.height);

//     }
//     update()
//     {
//         this.draw();

//     }
// }


class Platform {
    constructor(x, y, image) {
        this.position = {
            x: x,
            y: y
        }
        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }
    draw() {
        // // context.fillStyle="red";
        // context.fillRect(this.position.x,this.position.y,this.width,this.height);
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);


    }
    update() {
        this.draw();

    }
}


const player = new Player();
player.draw();
const platform1 = new Platform(200, window.innerHeight - plaformSmall.height, plaformSmall);
const platform2=new Platform(600,window.innerHeight-180,40,100);
const platform3=new Platform(1350,window.innerHeight-180,40,100);
const platform=new Platform(300,420,100,40);


//base platform
// const basePlaform1=new Platform(0,window.innerHeight-80,450,80);
// const basePlaform2=new Platform(520,window.innerHeight-80,1250,80);

const basePlaform1 = new Platform(0, window.innerHeight - plaformBase.height, plaformBase);
const basePlaform2 = new Platform(plaformBase.width + 90, window.innerHeight - plaformBase.height, plaformBase);
const basePlaform3 = new Platform(plaformBase.width + 90, window.innerHeight - plaformBase.height, plaformBase);
const basePlaform4 = new Platform(plaformBase.width * 2 + 15, window.innerHeight - plaformBase.height, plaformBase);

const platforms = [];
platforms.push(platform1, basePlaform1, basePlaform2, basePlaform3, basePlaform4);




function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.drawImage(backImage, 0 - offset, 0);
    context.drawImage(hillsImage, 0 - offset, 0);


    platform1.update();
    platforms.forEach((platform) => {
        platform.update();

    })
    player.update();


    if(keys.right)
    {    player.image=playerRunRight;
        player.cropWidth=340;
        player.width=127;



    } else if(keys.left)
    {    player.image=playerStandLeft;
        player.cropWidth=177;
        player.width=66;
    }


    else {
        player.image=playerStandRight;
        player.cropWidth=177;
        player.width=66;
    }
    if (keys.right && player.position.x < 950)
        player.velocity.x = speed;
    else if (keys.left && player.position.x > 250)
        player.velocity.x = -speed;
    else {
        player.velocity.x = 0;
        if (keys.right) {
            offset += speed;
            platforms.forEach((platform) => {
                platform.position.x -= speed;
            })
        }

        if (keys.left) {
            offset -= speed;
            platforms.forEach((platform) => {
                platform.position.x += speed;
            })
        }

    }
    if (offset + 950 >= 8000)
        console.log("Win");

    console.log(offset);

    platforms.forEach((platform) => {
        //Collision
        if (player.position.x + player.width + 1 >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width &&
            player.position.y + player.height >= platform.position.y &&
            player.position.y <= platform.position.y + platform.height
        )
            player.velocity.x = 0;

        if ((player.position.y + player.height) <= platform.position.y &&
            (player.position.y + player.height + player.velocity.y) >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            &&
            player.position.x <= platform.position.x + platform.width

        )
            player.velocity.y = 0;

    })


}
let id = setInterval(check, 100);
function check() {
    if (count == totalImages && gameStart == false) {
        gameStart = true;
        clearInterval(id);
        animate();

    }
}

addEventListener("keydown",(e)=>{
    console.log(e);
    if(e.key=="ArrowRight")
        player.velocity.x=speed;
    if(e.key=="ArrowLeft")
        player.velocity.x=-speed;
    if(e.key=="ArrowUp")
        player.velocity.y=-10;
})

addEventListener("keyup",(e)=>{
    console.log(e);
    if(e.key=="ArrowRight")
        player.velocity.x=0;
    if(e.key=="ArrowLeft")
        player.velocity.x=0;
})


addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key == "ArrowRight")
        keys.right = true;
    player.velocity.x=speed;
    if (e.key == "ArrowLeft")
        keys.left = true;
    player.velocity.x=-speed;
    if (e.key == "ArrowUp")
        player.velocity.y = -12;
})

addEventListener("keyup", (e) => {
    console.log(e);
    if (e.key == "ArrowRight")
        keys.right = false;
    player.velocity.x=0;
    if (e.key == "ArrowLeft")
        keys.left = false;
    player.velocity.x=0;
})