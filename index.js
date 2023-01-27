//create a canvas object from a query selector 
const canvas = document.querySelector('canvas')
//get data about canvas object
const c = canvas.getContext('2d')

//set dimensions, important for sprite animations
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})