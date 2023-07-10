//setup
const canvas= document.getElementById('canvas1')
const ctx= canvas.getContext('2d')//<---- provides the 2d rendering context for the drawing surface of a <canvas>element It is used for drawing shapes,text,image and other objects

canvas.width= window.innerWidth;
canvas.height=window.innerHeight;


class Particle{
constructor(effect){
    this.effect=effect;
    this.x=Math.random*this.effect.width;
    this.y=Math.random*this.effect.height;
}
draw(context){
    context.beginPath()
    context.arc(this.x,this.y,this.radius,0,Math.PI*2)
    context.fill()

}
}
class Effect{
    constructor(canvas){
        this.canvas=canvas
        this.width=this.canvas.width;
        this.height= this.canvas.height
        this.particles=[]
        this.numberOfParticles=20;
        this.createParticles();
    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++) {//array Push method Takes whatever we passs to it and it pushed that to the end of array
            this.particles.push(new Particle(this))

        }



    }
    handleParticles(context){
        this.particles.forEach(particle=>{
            particle.draw(context)
        })
    }

}
const effect= new Effect(canvas)
console.log(effect)

function animate(){

}