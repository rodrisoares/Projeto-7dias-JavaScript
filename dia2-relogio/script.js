let digitalElement = document.querySelector('.digital');  //relogio digital
let sElement = document.querySelector('.p_s');  //ponteiro de segundos do relogio analogico
let hElement = document.querySelector('.p_h');  //ponteiro de horas do relogio analogico
let mElement = document.querySelector('.p_m');  //ponteiro de minutos do relogio analogico

function updateClock() { //funcao para pegar a hora, minuto e segundo atual 
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`; 

    
    let sDeg = ((360/ 60) * second) - 90;     //calculo do angulo da posicao do ponteiro de segundo 
    let mDeg = ((360/ 60) * minute) - 90;     //calculo do angulo da posicao do ponteiro de minutos  
    let hDeg = ((360/ 12) * hour) - 90;       //calculo do angulo da posicao do ponteiro da hora  

    sElement.style.transform =`rotate(${sDeg}deg)`; //vai mudar a posicao do ponteiro de segundo 
    mElement.style.transform =`rotate(${mDeg}deg)`; //vai mudar a posicao do ponteiro de minuto 
    hElement.style.transform =`rotate(${hDeg}deg)`; //vai mudar a posicao do ponteiro da hora

}

function fixZero(time){  //funcao que recebe o time(horario) e verifica se o time é menor que 10, se for ira incrementar um 0 no valor do time 
    if(time < 10 ){
        return '0'+time;
    }else {
        return time;
    }
}

setInterval(updateClock,1000); //atualiza o relogio a cada 1 segundo
updateClock();
