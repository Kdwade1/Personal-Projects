//setup
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')//<---- provides the 2d rendering context for the drawing surface of a <canvas>element It is used for drawing shapes,text,image and other objects

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 5


const gradient = ctx.createLinearGradient(0, 0,0, canvas.height)

gradient.addColorStop(0, '#2e0202')
gradient.addColorStop(0.5,'#38e6e6')
gradient.addColorStop(1, '#8a42ff')
ctx.fillStyle = gradient
ctx.strokeStyle = gradient


// ctx.strokeStyle ='hsl(' +Math.random*360+',100%,50%)'


class Particle {

    constructor(effect) {
        this.effect = effect;
        this.radius = Math.floor(Math.random()*7+3);
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 4 - 2; // Random velocity between -1 and 1
        this.vy = 0
        this.gravity =this.radius *0.001;



    }

    draw(context) {
        // context.fillStyle = 'hsl(' + this.x * 0.5 + ',100%,50%)'

        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
        context.stroke();

    }
    update(){
        this.vy +=this.gravity
        this.x+=this.vx
        this.y+= this.vy;

        if(this.y>this.effect.height -this.radius){
            this.reset()
        }
    }
    reset(){
        this.x= this.radius+ Math.random()*(this.effect.width-this.radius*2)
        this.y=-this.radius -Math.random()*(this.effect.height*0.5);
        this.vy= 0;
    }

}

class Effect {
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height
        this.particles = []
        this.numberOfParticles = 200;
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {//array Push method Takes whatever we passs to it and it pushed that to the end of array
            this.particles.push(new Particle(this))

        }


    }

    handleParticles(context) {
        this.particles.forEach(particle => {
            particle.draw(context)
            particle.update();
        })
    }

}

const effect = new Effect(canvas)
console.log(effect)



function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    effect.handleParticles(ctx)
    requestAnimationFrame(animate)
}
animate()



