const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")
function setShape(shape){
    let canvasShape
    
    if(window.innerHeight > window.innerWidth) canvasShape = window.innerWidth * .8
    else canvasShape = window.innerHeight * .8
    canvas.setAttribute("width",canvasShape)
    canvas.setAttribute("height",canvasShape)
    return canvasShape
}
window.addEventListener("resize",startGame)
function startGame(){  
    const elementSize = setShape() / 10

    game.font = `${elementSize-20}px Verdana`
    game.textAlign = ""
    let map = maps[0]
    map = map.trim().split("\n")
    map.forEach((line,row) => {
        console.log(line)
        line.trim().split("").forEach((caracter,column)=>{
            console.log(caracter)
            game.fillText(
                emojis[caracter],
                elementSize*(column),
                elementSize*(row+.5)
            )
        })
    });
}
window.addEventListener("load",startGame)
// detectar movimientos del jugador

let BTNContainer = document.querySelector(".btns")
function up(){
    console.log("has presionado el bonton up")
}
function down(){
    console.log("has presionado el bonton down")
}
function right(){
    console.log("has presionado el bonton right")
}
function left(){
    console.log("has presionado el bonton left")
}
let botonesMovimiento = {
    up,
    down,
    right,
    left
}
BTNContainer.addEventListener("click",e=>{
    let targuet = e.target.id
    console.log(botonesMovimiento)
    
})

document.addEventListener("keydown",e=>{
    console.log(e.key)
})