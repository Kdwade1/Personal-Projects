//setup
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')//<---- provides the 2d rendering context for the drawing surface of a <canvas>element It is used for drawing shapes,text,image and other objects

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 5
const gradient= ctx.createLinearGradient(0,0,canvas.width,canvas.height)

gradient.addColorStop(0,'crimson')
gradient.addColorStop(0.5,'purple')
gradient.addColorStop(1,'indigo')
ctx.fillStyle=gradient
ctx.strokeStyle ='green'

// ctx.strokeStyle ='hsl(' +Math.random*360+',100%,50%)'


class Particle {

    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random()*5 +2;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() *4- 2; // Random velocity between -1 and 1
        this.vy = Math.random()*4- 2



    }

    draw(context) {
        // context.fillStyle = 'hsl(' + this.x * 0.5 + ',100%,50%)'

        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
        // context.stroke();

    }
    update(){
        this.x+= this.vx
        if(this.x>this.effect.width -this.radius|| this.x< this.radius)this.vx *=-1


        this.y +=this.vy
        if(this.y>this.effect.width -this.radius|| this.y< this.radius)this.vy *=-1
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
        for (let i = 0; i < this.numberOfParticles; i++) {//array Push method Takes whatever we pass to it, and it pushed that to the end of array
            this.particles.push(new Particle(this))

        }


    }

    handleParticles(context) {
        this.connectParticles(context)
        this.particles.forEach(particle => {
            particle.draw(context)
            particle.update();

        })

    }

    connectParticles(context) {
        const maxDistance = 100
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i+1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x
                const dy = this.particles[i].y - this.particles[j].y
                const distance = Math.hypot(dx, dy)

                if (distance < maxDistance) {
                    context.save()
                    const opacity=1-(distance/maxDistance)
                    context.globalAlpha =opacity
                    context.beginPath();
                    context.moveTo(this.particles[i].x, this.particles[i].y)
                    context.lineTo(this.particles[j].x, this.particles[j].y)
                    context.stroke()
                    context.restore()


                }

            }
        }

    }
}

const effect = new Effect(canvas)
// console.log(effect)



function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    effect.handleParticles(ctx)
    requestAnimationFrame(animate)
}

animate()





