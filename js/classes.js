class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }
  
    animateFrames() {
      this.framesElapsed++
  
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }

}

class Ball extends Sprite{
    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
      }) {
        super({
          position,
          imageSrc,
          scale,
          framesMax,
          offset
        })
    
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.color = color
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false
    
        for (const sprite in this.sprites) {
          sprites[sprite].image = new Image()
          sprites[sprite].image.src = sprites[sprite].imageSrc
        }
      }
    
      update() {
        this.draw()
        if (!this.dead) this.animateFrames()
    
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    
        // gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
          this.velocity.y = 0
          this.position.y = 330
        } else this.velocity.y += gravity
      }
    
    
      takeHit() {
        this.health -= 20
    
        if (this.health <= 0) {
          this.switchSprite('death')
        } else this.switchSprite('takeHit')
      }
    
      switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
          if (this.framesCurrent === this.sprites.death.framesMax - 1)
            this.dead = true
          return
        }
    
        // overriding all other animations with the attack animation
        if (
          this.image === this.sprites.attack1.image &&
          this.framesCurrent < this.sprites.attack1.framesMax - 1
        )
          return
    
        // override when fighter gets hit
        if (
          this.image === this.sprites.takeHit.image &&
          this.framesCurrent < this.sprites.takeHit.framesMax - 1
        )
          return
    
        //Edit to jumping and idling
        switch (sprite) {
          case 'idle':
            if (this.image !== this.sprites.idle.image) {
              this.image = this.sprites.idle.image
              this.framesMax = this.sprites.idle.framesMax
              this.framesCurrent = 0
            }
            break
          case 'move':
            if (this.image !== this.sprites.move.image) {
              this.image = this.sprites.move.image
              this.framesMax = this.sprites.move.framesMax
              this.framesCurrent = 0
            }
            break
          case 'jump':
            if (this.image !== this.sprites.jump.image) {
              this.image = this.sprites.jump.image
              this.framesMax = this.sprites.jump.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'fall':
            if (this.image !== this.sprites.fall.image) {
              this.image = this.sprites.fall.image
              this.framesMax = this.sprites.fall.framesMax
              this.framesCurrent = 0
            }
            break
    
          case 'death':
            if (this.image !== this.sprites.death.image) {
              this.image = this.sprites.death.image
              this.framesMax = this.sprites.death.framesMax
              this.framesCurrent = 0
            }
            break
        }
      }
    
}

//TODO Implement a "block/platform" class for a sprite that our character can stand on

// function rectangularCollision({ rectangle1, rectangle2 }) {
//     return (
//       rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
//         rectangle2.position.x &&
//       rectangle1.attackBox.position.x <=
//         rectangle2.position.x + rectangle2.width &&
//       rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
//         rectangle2.position.y &&
//       rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
//     )
//   }

//Something like this? Checks to see bounds of boxes and if they are colliding, set position to 0 or reduce velocity or something?