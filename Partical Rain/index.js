
const canvas=document.getElementById('canvas')
const ctx=canvas.getContext('2d')
canvas.width=500;
canvas.height=706;


const myImage=new myImage()
myImage.src='image1.png';


myImage.addEventListener('load',function(){
    ctx.draw(myImage,0,0)
})
