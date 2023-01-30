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


const StaticItem = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './img/Item.png',
  scale: 2.75,
  //Edit this to value of sprite
  framesMax: 6
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  //Set to idle image and animation as a default on creation
  imageSrc: './img/.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img//Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img//Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img//Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img//Fall.png',
      framesMax: 2
    },
    takeHit: {
      imageSrc: './img//Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img//Death.png',
      framesMax: 6
    }
  }
})

//Create any new sprites in here, fire + clones etc


const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()

  player.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }
  

  

    //  this is where our player gets hit
    // if (
    //   rectangularCollision({
    //     rectangle1: enemy,
    //     rectangle2: player
    //   }) &&
    //   enemy.isAttacking &&
    //   enemy.framesCurrent === 2
    // ) {
    //   player.takeHit()
    //   enemy.isAttacking = false

    //   gsap.to('#playerHealth', {
    //     width: player.health + '%'
    //   })
    // }

  
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -20
        break
    }
  }

  
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }
})