function main() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    class Bar {
        constructor(x, y, width, height, color,index) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color
            this.index=index;
        }

        update(micInput) {
            const sound = micInput * 1000
            if (sound > this.height) {
                this.height = sound
            } else {
                this.height -= this.height *0.08
            }
        }

        draw(context) {
            context.strokeStyle=this.color
            context.save();
            context.translate(canvas.width/2, canvas.height/2)
            context.rotate(this.index*0.05)
            // context.fillStyle = this.color
            // context.fillRect(this.x, this.y, this.width, this.height)
            context.beginPath();
            context.moveTo(this.x,this.y);
            context.lineTo(0,this.height);
            context.stroke()

            context.restore();
        }
    }


    const microphone= new Microphone();
    let bars=[]
    let barWidth= canvas.width/256;
    let barHeight= canvas.height/256;
    function createBars(){
        for(i =0; i<256; i++){
            let color= 'hsl('+i *2+',100%,50%)'
            bars.push(new Bar(i*barWidth,canvas.height/2,3,1,color,i))
        }
    }
    createBars()
    console.log(bars)


    function animate() {
        if(microphone.initialized) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            //generates audio samples from microphone
            const sample = microphone.getSample()

            bars.forEach(function (bar,i) {
                bar.draw(ctx)
                bar.update(sample[i])
            });
        }
        requestAnimationFrame(animate)
    }

    animate()
}