const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 64 * 16;//1024
canvas.height = 64 * 9;//576

const parseCollisions = collisionLvl1.parse2D()
const collisionBlocks = parseCollisions.createObjectsFrom2D()


backgroundLevel = new Sprite({
    position: {
        x: 0,
        y: 0,

    },
    imageSrc: './img/backgroundLevel1.png'
})
const player = new Player({
    collisionBlocks,
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/idle.png',

        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/idleLeft.png',

        },
        runRight: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runRight.png',

        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runLeft.png',

        }, enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                console.log("You did it")
                overlay.opacity
                gsap.to(overlay,{
                    opacity: 1
                })
            }

        }

    }
})
const doors = [
    new Sprite({
        position: {
            x: 767,
            y: 270
        },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        autoplay: false

    })
]
const keys = {
    w: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

const overlay ={
    opacity:0
}

function animate() {
    window.requestAnimationFrame(animate)
    // c.fillStyle = 'black'
    // c.fillRect(0, 0, canvas.width, canvas.height)

    backgroundLevel.draw()
    collisionBlocks.forEach((collisionBlock => {
        collisionBlock.draw()
    }))
    doors.forEach((door => {
        door.draw()
    }))
    player.handleInput(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha=overlay.opacity
    c.fillStyle='black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()



}

animate()
