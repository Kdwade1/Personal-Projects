class Player extends Sprite {
    constructor({
                    collisionBlocks = [], imageSrc, frameRate
                }) {
        super({imageSrc, frameRate})
        this.position = {
            x: 200,
            y: 200
        }

        this.sides = {
            top: this.position.y - this.height,
            bottom: this.position.y + this.height
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1
        this.collisionBlocks = collisionBlocks
        console.log(this.collisionBlocks)
    }

    // draw() {
    //     c.fillStyle = 'red'
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }

    update() {
        // c.fillStyle='rgba(0,0,255,.5)'
        // c.fillRect(this.position.x, this.position.y,this.width,this.height)
        this.position.x += this.velocity.x
        //check for horizontal collisions
        this.updateHitBox()
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.updateHitBox()

        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        this.checkForVerticalCollision()


//checks for vertical collisions


    }

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53

        }

    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.x < 0) {
                   const offset= this.hitBox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width -offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }


        }

    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y

    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        }


    }
}