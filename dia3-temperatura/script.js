document.querySelector('.busca').addEventListener('submit', async (event)=>{//previnir que o formulario nao seja enviado
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;   //para saber o que o usuario digitou 
   
   if(input !=='') { //para saber se tem alguma coisa digitada dentro do input
    clearInfo();
    showWarning('Carregando...'); 
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`; //api do openweathermap

    let results = await fetch(url);
    let json = await results.json();

    if(json.cod ===200) {
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        });
    } else {
        clearInfo();
        showWarning('Não encontramos essa localização');
      }
   } 

});

function showInfo(json) {       //funcao que vai receber o json e depois vai exibir as informacoes do tempo 
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup> `;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform=`rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display ='block';
}

function clearInfo() { //funcao que vai limpar o resultado 
    showWarning('');
    document.querySelector('.resultado').style.display ='none';
}

function showWarning(msg) {  //funcao para mostrar algo no campo de aviso, um erro ou retornar informacoes do tempo
    document.querySelector('.aviso').innerHTML = msg;
}   