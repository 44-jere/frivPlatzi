const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")
let canvasShape
let level = 0
let vidas = 2
let StartTime
let tiempoTransCurrido
function getDimensions(){
    if(window.innerHeight > window.innerWidth) return window.innerWidth * .8
    else return window.innerHeight * .8
}
function actualizarVidas(){
    let lives = vidas
    if(lives >= 0 ) lives = lives +1
    let spanVidas = document.getElementById("lives")
    spanVidas.innerText = emojis["HEART"].repeat(lives)
}
actualizarVidas()
function actualizarRecord(){
    const actualRecord = localStorage.getItem("record")
    if(isNaN(actualRecord) || actualRecord === null) return
    const recordSpan = document.getElementById("record")
    recordSpan.innerText = formatearDiferenciaTiempo(parseInt(actualRecord))
}
actualizarRecord()
function setShape(){
    canvasShape = getDimensions()
    canvas.setAttribute("width",canvasShape)
    canvas.setAttribute("height",canvasShape)
    return canvasShape
}
function resetPlayerPosition(x = undefined,y = undefined){
    playerPosition.x = x
    playerPosition.y = y
    return false
}
function showPlayer(){
    game.fillText(emojis["PLAYER"],playerPosition.x,playerPosition.y)
}
function resetTime(){
    clearInterval(tiempoTransCurrido)
    StartTime = undefined
    document.getElementById("time").innerText=""
}
function setRecord(){
    let previousRecord = localStorage.getItem("record")
    if(isNaN(previousRecord) || previousRecord === null){
        localStorage.setItem("record",0)
        return false
    }
    previousRecord = parseInt(previousRecord)
    let gameOverTime = new Date()
    let actualRecord = gameOverTime-StartTime
    if(isNaN(actualRecord)) return false
    if(previousRecord<=actualRecord) return false
    localStorage.setItem("record",actualRecord)
}
function bajarVida(){
    if(vidas < 1 ){
        level = 0
        vidas = 2
        actualizarVidas()
        resetPlayerPosition()
        startGame()
        resetTime()
        return true
    }
    vidas--
    actualizarVidas()
    resetPlayerPosition(playerPosition.puertaX,playerPosition.puertaY)
    return false
}
function formatearDiferenciaTiempo(diferenciaMilisegundos) {
    // Verificar si el argumento es un número válido
    if (isNaN(diferenciaMilisegundos) || typeof diferenciaMilisegundos !== 'number') {
        throw new RangeError('Valor de tiempo inválido');
    }
    // Crear una nueva fecha basada en la diferencia en milisegundos
    let fecha = new Date(diferenciaMilisegundos);

    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
        throw new RangeError('Valor de tiempo inválido');
    }
    
    // Opciones de formateo para horas, minutos y segundos en formato de 24 horas
    let opciones = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Asegura que se use el formato de 24 horas
        timeZone: 'UTC' // Asegura que el tiempo se formatee en UTC
    };

    // Formateador de fecha y hora
    let formateador = new Intl.DateTimeFormat('default', opciones);

    // Formatear la fecha
    return formateador.format(fecha);
}
function contarTiempo(){
    function setTime(tiempo){
        let diferenciaTiempo = new Date() - StartTime
        diferenciaTiempo = formatearDiferenciaTiempo(diferenciaTiempo)
        tiempo.innerText = diferenciaTiempo
    }
    let tiempo = document.getElementById("time")
    setTime(tiempo)
    tiempoTransCurrido = setInterval(e=>{
        setTime(tiempo)
    },1000)
}
function nextLevel(){

    if(maps.length-1 <= level){
        alert("no hay mas niveles")
        level = 0
        setRecord()
        actualizarRecord()
        resetTime()
    }else level++
    resetPlayerPosition()
    startGame()
    return true
}
function validarColisiones(posX,posY,caracter){
    if(
        parseInt(playerPosition.y) === parseInt(posY) &&
        parseInt(playerPosition.x) === parseInt(posX) &&
        caracter !== "-" &&
        caracter !=="O"
    ){
        if(caracter === "I") return nextLevel()
        else return bajarVida()
    }
}
function startGame(){
    const elementSize = Math.floor(setShape() / 10)
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
                playerPosition.x = posX
                playerPosition.y = posY
                playerPosition.puertaX = posX
                playerPosition.puertaY = posY
            }
            if(playerPosition.x <= 0) playerPosition.x = 0 // evita tener numeros negativos en el eje x
            return validarColisiones(posX,posY,caracter)
        })
    });
    showPlayer()
}

// detectar movimientos del jugador
const playerPosition = {
    x:undefined,
    y:undefined,
    puertaX:undefined,
    puertaY:undefined
}
let BTNContainer = document.querySelector(".btns")
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
    if(!StartTime){
        StartTime = new Date()
        contarTiempo()
    }
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

function resize(){
    resetPlayerPosition()
    startGame()
}
window.addEventListener("resize",resize)
window.addEventListener("load",startGame)