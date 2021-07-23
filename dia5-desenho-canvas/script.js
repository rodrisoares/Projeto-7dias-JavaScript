//Dados iniciais
let currentColor = 'black'; //cor que esta selecionada
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

//Eventos
 document.querySelectorAll('.colorArea .color').forEach(item =>{
     item.addEventListener('click', colorClickEvent)
 });


 /* passo a passo para desenhar no canvas:
-Quando o click do mouse estiver clicado, ative o modo desenho
-Quando o mouse se mover e se o modo de desenho estiver ativado, desenhe.
-Quando soltar o click do mouse, desative o modo desenho
 */

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup',mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

 //Funcoes
 function colorClickEvent(e) { //funcao para verificar qual foi a cor clicada
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
 }

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}
function mouseUpEvent() {
    canDraw = false;
}
function draw(x,y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();
    
    mouseX = pointX;
    mouseY = pointY;
}
function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}