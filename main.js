const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")
let canvasShape
function setShape(){
    
    if(window.innerHeight > window.innerWidth) canvasShape = window.innerWidth * .8
    else canvasShape = window.innerHeight * .8
    canvas.setAttribute("width",canvasShape)
    canvas.setAttribute("height",canvasShape)
    return canvasShape
}
window.addEventListener("resize",startGame)
function startGame(){  
    const elementSize = setShape() / 10
    canvasShape = elementSize
    game.font = `${elementSize-20}px Verdana`
    game.textAlign = ""
    let map = maps[0]
    map = map.trim().split("\n")
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
            if(caracter === "O"){
                playerPosition.y = posY
                playerPosition.x = posX
            }
        })
    });
    game.fillText(emojis["PLAYER"],playerPosition.x,playerPosition.y)
}
window.addEventListener("load",startGame)
// detectar movimientos del jugador
const playerPosition = {
    x:undefined,
    y:undefined
}
let BTNContainer = document.querySelector(".btns")
function ArrowUp(){
    console.log("has presionado el bonton up")
    playerPosition.y -= canvasShape
    console.log(playerPosition)
}
function ArrowDown(){
    console.log("has presionado el bonton down")
}
function ArrowRight(){
    console.log("has presionado el bonton right")
}
function ArrowLeft(){
    console.log("has presionado el bonton left")
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