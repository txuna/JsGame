// Stop time : 44 min 

const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

const WIDTH = 700
const HEIGHT = 700

canvas.width = window.innerWidth
canvas.height = window.nnerHeight - 20

//c.moveTo(window.innerWidth - (window.innerWidth + 700) / 2, window.innerHeight - (window.innerHeight + 700) / 2)


//const center_x = canvas.width - (canvas.width + WIDTH) / 2
//const center_y = canvas.height - (canvas.height + HEIGHT) / 2

const gravity = 1.5

/*
class Map{
    constructor(){
        this.position = {
            x: center_x, 
            y: center_y
        }
        this.width = WIDTH
        this.height = HEIGHT
    }

    update(){

    }

    draw(){
        c.fillStyle = '#EEE'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
*/

class Player{
    constructor(){
        this.position = {
            x: 220, 
            y: 100
        }
        this.velocity = {
            x : 0, 
            y : 10
        }
        this.width = 25
        this.height = 25
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    // 동작 진행 
    update(){
        // 동작 진행전에 해당 객체 그리기
        this.draw()
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y 

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0;
        }
    }
}

class Platform{
    constructor(x_pos, y_pos){
        this.position = {
            x: x_pos, 
            y: y_pos
        }
        this.width = 400
        this.height = 20
    }
    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player() 
//const platform = new Platform()
const platforms = [new Platform(300, 700), new Platform(1500, 500)]
//const map = new Map()


const keys = {
    right:{
        pressed: false 
    },
    left:{
        pressed: false
    }
}

let scrollOffset = 0

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);
    //map.draw()
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    //platform.draw()

    if(keys.right.pressed && player.position.x + player.width < center_x + WIDTH){
        player.velocity.x = 5 
    }else if(keys.left.pressed && player.position.x > 200){
        player.velocity.x = -5
    }else{
        player.velocity.x = 0
        // 오른쪽끝에 왔을 때 배경스크롤을 위해 플랫폼 왼쪽으로 이동
        // 배경이나 몬스터 npc가 있다면 모두다 이동
        if(keys.right.pressed){
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if(keys.left.pressed){
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }

    platforms.forEach(platform => {
        // 점프하는 도중에는 무시됨. 점프를 다 해야 platform의 y위치보다 높아지기 때문에 메이플처럼 가능
        if(player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x  <= platform.position.x + platform.width){
            player.velocity.y = 0
        }
    })
    if(scrollOffset > 2000){
        console.log("WIN")
    }    
}

animate()


addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        // UP 
        case 38:
            player.velocity.y -= 30
            break 
        // LEFT
        case 37:
            keys.left.pressed = true
            break
        // RIGHT 
        case 39:
            keys.right.pressed = true
            break
        // DOWN
        case 40:
            break 
    }
})

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
        // UP 
        case 38:
            break 
        // LEFT
        case 37:
            keys.left.pressed = false
            break
        // RIGHT 
        case 39:
            keys.right.pressed = false
            break
        // DOWN
        case 40:
            break 
    }
})