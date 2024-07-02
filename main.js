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
    alert("siguiente nivel")
    if(maps.length-1 <= level){
        alert("no hay mas niveles")
        level = 0
    }else level++
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
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
    map.forEach((line,row) => {
        line.trim().split("").forEach((caracter,column)=>{
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
                console.log(caracter)
                if(caracter === "I") nextLevel()
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
    console.log("has presionado el bonton up")
    movePlayer("y",-1)
    startGame()
}
function ArrowDown(){
    console.log("has presionado el bonton down")
    movePlayer("y",1)
    startGame()
}
function ArrowRight(){
    console.log("has presionado el bonton right")
    movePlayer("x",1)
    startGame()
}
function ArrowLeft(){
    console.log("has presionado el bonton left")
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
    if(!funcion) return console.log("esta funcion no existe")
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