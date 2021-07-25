let areas = {   //posicao inicial dos objetos na area vazia
    a: null,
    b: null,
    c: null
};


//Eventos
document.querySelectorAll('.item').forEach(item => {  //evento para cada item, quando começar a arrastar o mouse e depois quando soltar o mouse
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => { //evento que roda sempre que passa por cima da area do quadrado vazio
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

//Funcoes do item
function dragStart(e) {     // funcao para quando começar a arrastar o mouse  
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {   // funcao para quando soltar o mouse  
    e.currentTarget.classList.remove('dragging');
}


//Funcoes da area
function dragOver(e) {  //funcao para quando arrastar o item e passar por cima da area do quadrado vazio
    if(e.currentTarget.querySelector('.item') === null) {
         e.preventDefault();
         e.currentTarget.classList.add('hover');
    }
}
function dragLeave(e) {  //funcao quando sair de uma area vazia
    e.currentTarget.classList.remove('hover');
}
function drop(e) {  //funcao de quando soltar um item dentro do quadrado vazio
    e.currentTarget.classList.remove('hover');

    if(e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

//Funcoes da area neutral 
function dragOverNeutral(e) {  
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e) { 
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e) { 
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

//Funcoes de logica
function updateAreas() {  //funcao para atualizar as areas
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });
    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}