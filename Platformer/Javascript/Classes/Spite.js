class Sprite {
    constructor({position, imageSrc,frameRate=1}) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width/this.frameRate
            this.height= this.image.height
        }
        this.image.src = imageSrc
        this.loaded = false
        this.frameRate= frameRate
        this.currentFrame=0
        this.elaspedFrames= 0
        this.frameBuffer=2
//if property is dynamic add it to constructor
    }

    draw() {
        if (!this.loaded) return
        const Cropbox={
            position:{
                x:this.width* this.currentFrame,
                y:0
            },
            width:this.width,
            height:this.height

        }
        c.drawImage(this.image,Cropbox.position.x,Cropbox.position.y,Cropbox.width,Cropbox.height, this.position.x, this.position.y,this.width,this.height)
        this.updateFrame()
    }
    updateFrame() {
this.elaspedFrames++
        if (this.elaspedFrames % this.frameBuffer===0) {

            if (this.currentFrame < this.frameRate - 1)
                this.currentFrame++
            else
                this.currentFrame = 0;
        }


    }

}

