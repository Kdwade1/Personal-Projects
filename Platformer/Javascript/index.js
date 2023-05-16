const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 64 * 16;//1024
canvas.height = 64 * 9;//576
backgroundLevel= new Sprite({
    position:{
        x:0,
        y:0,

    },
    imageSrc:'./img/backgroundLevel1.png'
})
const player = new Player()
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

function animate() {
    window.requestAnimationFrame(animate)
    // c.fillStyle = 'black'
    // c.fillRect(0, 0, canvas.width, canvas.height)

backgroundLevel.draw()
    player.velocity.x=0

    if (keys.d.pressed) player.velocity.x = 4
     else if (keys.a.pressed) player.velocity.x = -4

    player.draw()
    player.update()




}

animate()
