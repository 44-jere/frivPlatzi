const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")
let canvasShape
let level = 0
function getDimensions(){
    if(window.innerHeight > window.innerWidth) return window.innerWidth * .8
    else return window.innerHeight * .8
}
function setShape(){
    canvasShape = getDimensions()
    canvas.setAttribute("width",canvasShape)
    canvas.setAttribute("height",canvasShape)
    return canvasShape
}
function nextLevel(){
    if(maps.length-1 <= level){
        alert("no hay mas niveles")
        level = 0
    }else level++
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
    return true
}
window.addEventListener("resize",startGame)
function startGame(){  
    const elementSize = setShape() / 10
    canvasShape = elementSize
    game.font = `${elementSize-20}px Verdana`
    game.textAlign = ""
    let map = maps[level]
    map = map.trim().split("\n")
    game.clearRect(0,0,canvasShape,canvasShape)
    map.find((line,row) => {
        return line.trim().split("").find((caracter,column)=>{
            const emoji = emojis[caracter]
            const posX = elementSize*(column)
            const posY = elementSize*(row+.5)
            game.fillText(
                emoji,
                posX,
                posY
            )
            if(caracter === "O" && !playerPosition.y){
                playerPosition.y = posY
                playerPosition.x = posX
            }
            if(playerPosition.x <= 0) playerPosition.x = 0
            if(
                parseInt(playerPosition.y) === parseInt(posY) &&
                parseInt(playerPosition.x) === parseInt(posX) &&
                caracter !== "-" &&
                caracter !=="O"
            ){
                if(caracter === "I") return nextLevel()
                else console.log("1 vida menos por wey")
            }
        })
    });
    showPlayer()
}
window.addEventListener("load",startGame)
// detectar movimientos del jugador
const playerPosition = {
    x:undefined,
    y:undefined
}
let BTNContainer = document.querySelector(".btns")
function showPlayer(){
    game.fillText(emojis["PLAYER"],playerPosition.x,playerPosition.y)
}
function movePlayer(posision,direccion){   
    let move = playerPosition[posision] +(direccion*canvasShape)
    if(move<-1 || move >= getDimensions()) return 
    playerPosition[posision] = move
    showPlayer()
}
function ArrowUp(){
    movePlayer("y",-1)
    startGame()
}
function ArrowDown(){
    movePlayer("y",1)
    startGame()
}
function ArrowRight(){
    movePlayer("x",1)
    startGame()
}
function ArrowLeft(){
    movePlayer("x",-1)
    startGame()
}
const botonesMovimiento = {
    ArrowUp,
    ArrowDown,
    ArrowRight,
    ArrowLeft
}
function presionarBTN(targuet){
    let funcion = botonesMovimiento[targuet]
    if(!funcion) return
    funcion()
}
BTNContainer.addEventListener("click",e=>{
    let targuet = e.target.id
    presionarBTN(targuet)    
})

document.addEventListener("keydown",e=>{
    let targuet = e.key
    presionarBTN(targuet)   
})