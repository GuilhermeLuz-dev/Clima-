// Declarando variáveis
const input = document.querySelector('#container_form input');
const search = document.querySelector('#container_form button');
const region = document.querySelector('#container_clima h1 span');
const flag = document.querySelector('#container_clima #region img');
const desc_img = document.querySelector('#desc_clima img');
const desc = document.querySelector('#desc_clima h2');
const temp = document.querySelector('#temperature');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const containerPrinc = document.querySelector("#container_clima")
const body = document.querySelector('body')

const API_key = "3a8672ed191cce5663927fe7199ab6e8"

let viewingWeather = false

// Funções 

// Pegando o nome da cidade e iniciando busca pela clima
const startSearch = (e) => {
    e.preventDefault();
    const city = input.value;
    showWeather(city)
}

//Expondo os dados na tela; 
const showWeather = async (city) => {

    if (viewingWeather) {
        containerPrinc.setAttribute('class', 'vanish');
    }

    const data = await getWeatherData(city)
    favicon.setAttribute('href', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    region.innerText = data.name;
    flag.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    desc_img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    desc.innerText = data.weather[0].main;
    temp.innerText = parseInt(data.main.temp) + "ºC";
    wind.innerText = data.wind.speed + "km/h";
    humidity.innerText = data.main.humidity + "%";
    containerPrinc.classList.remove('some');
    containerPrinc.setAttribute('class', 'appear');
    viewingWeather = true
    alterarBackground(data.weather[0].main)

}
// Acessando api e convertendo os dados
const getWeatherData = async (city) => {
    const API_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}&leng=pt_br`;
    const res = await fetch(API_url);
    const data = await res.json();
    return data;

}
// Alterando o background de acordo com o clima
const alterarBackground = (desc) => {
    switch (desc) {
        case 'Clouds':
            body.style.background = 'linear-gradient(90deg,#ffff,30%,#83F4FC)'

            break;
        case 'Drizzle':
            body.style.background = 'linear-gradient(90deg,#C5DAF6,30%,#3B72C1)'

            break;
        case 'Thunderstorm':
            body.style.background = 'linear-gradient(90deg,#0346A2,30%,#010C1B)'

            break;
        case 'Rain':
            body.style.background = 'linear-gradient(90deg,#73A8F1,30%,#092040)'

            break;
        case 'Clear':
            body.style.background = ' linear-gradient(90deg,#FFF500,30%,#86FAFF)'

            break;
        case 'Snow':
            body.style.background = ' linear-gradient(90deg,#83F4FC,10%,#ffff)'
            break;
        case 'Mist':
            body.style.background = ' linear-gradient(90deg,#83F4FC,20%,#ffff)'
            break;

        default:
            break;
    }
}

// Adicionando eventos

// Adicionando eventos de click no button search, ou ao pressionar o enter
search.addEventListener('click', (e) => {
    startSearch(e)
});
input.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        startSearch(e)
    }
})

