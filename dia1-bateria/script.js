document.body.addEventListener('keyup', (event) => {  //quando apertar e soltar a tecla, vai executar essa funcao
    playSound(event.code.toLowerCase());
});    

document.querySelector('.composer button').addEventListener('click', () =>{ //evento do campo de composicao 
    let song = document.querySelector('#input').value;

    if(song !== ''){
        let songArray = song.split('');
        playComposition(songArray);
    }
});

function playSound(sound) {   //funcao que executa um som de acordo com a tecla
    let audioElement = document.querySelector(`#s_${sound}`); 
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);


    if(audioElement){
        audioElement.currentTime = 0;
        audioElement.play(); 
    }

    if(keyElement){
        keyElement.classList.add('active');

        setTimeout(() =>{
            keyElement.classList.remove('active');  
        },300);
    }
}

function playComposition(songArray)  {  //funcao que executa a sequencia de letras que eu cliquei quando apertar o botao Tocar 
    let wait = 0;
    
    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);

        wait += 250;
    }
}  