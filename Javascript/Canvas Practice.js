let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')
const colors = [
    "#2B2D42",
    "#8D99AE",
    "#EDF2F4",
    "#EF233C",
    "#D90429"

]

// c.fillStyle = "gold"
// c.fillRect(100,100,100,100);
// c.fillStyle= "pink"
// c.fillRect(600,500,300,300);
// c.fillStyle ="indigo"
// c.fillRect(230,200,300,300);


//line

// c.beginPath();
// c.moveTo(110, 300);
// c.lineTo(300,100);
// c.lineTo(400,100);
// c.lineTo(700,300);
// c.lineTo(700,500);
// c.lineTo(500,500);
// c.lineTo(-550,500);
// c.lineTo(110,300);
// c.strokeStyle= "red"
// c.stroke();

//arc
// c.beginPath()
// c.arc(200,200,30,0,Math.PI *2,false);
// c.strokeStyle = "blue"
// c.stroke()
let mouse = {
    x: undefined,
    y: undefined
}
let maxRadius= 40;
let minRadius = 10;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
    console.log(mouse)

})
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Circle(x, y, dx, dy, radius,minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius= radius;
    this.color =randomColor(colors);

    this.draw = function () {
        let color = randomColor(colors)
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "black"
        c.fillStyle= this.color
        c.stroke()

        c.fill()
    }
    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }
        this.draw()
    }
}

// let x = Math.random()* window.innerWidth;
// let dx = (Math.random()-0.5)*10;
// let radius = 30;
// let y =  Math.random()* window.innerHeight;
// let dy = (Math.random()-0.5)*10;



let circleArray = [];
function init(){
    circleArray=[];
    for (let i = 0; i < 2000; i++) {
        let radius = Math.random()*7+1 ;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 10;

        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dy = (Math.random() - 0.5) * 10;
        circleArray.push(new Circle(x, y, dx, dy, radius))


    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();


    }

}

init()
animate()


function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


// for(let i =0; i<3; i++){
//     let x =Math.random()* canvas.width;
//     let y =Math.random()*canvas.height;
//     c.beginPath()
//     c.arc(x,y,30,0,Math.PI *2,false);
//     c.strokeStyle = randomColor(colors)
//     c.stroke()
// }
