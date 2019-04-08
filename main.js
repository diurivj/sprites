const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const frames = 0
let interval

const images = {
  bg: 'https://htmlacademy.ru/assets/course70/nyan-cat-bg.png',
  nyan: './ezgif.com-gif-maker (1).png'
}

class Background {
  constructor() {
    this.x = 0
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => this.draw()
    this.audio = new Audio()
    this.audio.src = 'http://www.nyan.cat/music/original.mp3'
    this.audio.loop = true
  }
  draw() {
    if (this.x < -canvas.width) this.x = 0
    ctx.drawImage(this.img, this.x, 0, canvas.width, canvas.height)
    ctx.drawImage(
      this.img,
      this.x + canvas.width,
      0,
      canvas.width,
      canvas.height
    )
    this.x--
  }
}

class Nyan {
  constructor() {
    this.x = 0
    this.y = 150
    this.img = new Image()
    this.img.src = images.nyan
    this.sx = 0
    this.sy = 0
  }
  draw() {
    if (this.sx > 4200) this.sx = 0
    ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      350,
      386,
      this.x,
      this.y,
      150,
      150
    )
    this.sx += 350
  }
}

const background = new Background()
const nyan = new Nyan()

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  background.draw()
  nyan.draw()
}

function start() {
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 13:
      background.audio.play()
      return start()
    case 38:
      return (nyan.y -= 20)
    case 40:
      return (nyan.y += 20)
  }
})
