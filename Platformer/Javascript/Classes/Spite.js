class Sprite {
    constructor({position, imageSrc,frameRate=1,animations,frameBuffer =2,loop=true,autoplay=true}) {
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
        this.frameBuffer=frameBuffer
        this.animations= animations
        this.loop = loop;
        this.autoplay=autoplay
        this.currentAnimation

        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }
            console.log(this.animations)
        }
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
    play(){
        this.autoplay= true
    }
    updateFrame() {
    if(!this.autoplay)return
this.elaspedFrames++
        if (this.elaspedFrames % this.frameBuffer===0) {

            if (this.currentFrame < this.frameRate - 1)
                this.currentFrame++
            else if (this.loop)
                this.currentFrame = 0;
        }
        if (this.currentAnimation?.onComplete) {
            if (
                this.currentFrame === this.frameRate - 1 &&
                !this.currentAnimation.isActive
            ) {
                this.currentAnimation.onComplete()
                this.currentAnimation.isActive = true
            }
        }


    }

}

