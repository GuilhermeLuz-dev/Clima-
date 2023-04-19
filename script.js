// Declarando variáveis
const input = document.querySelector('#container_form input');
const search = document.querySelector('#container_form button');
const local = document.querySelector('#container_clima h1 span');
const bandeira = document.querySelector('#container_clima #local img');
const desc_img = document.querySelector('#desc_clima img');
const desc = document.querySelector('#desc_clima h2');
const temp = document.querySelector('#temperatura');
const ventos = document.querySelector('#ventos');
const humidade = document.querySelector('#humidade');
const containerPrinc = document.querySelector("#container_clima")

const API_key = "3a8672ed191cce5663927fe7199ab6e8"


// Funções 
const pegarDadosClima = async (cidade) => {
    const API_url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_key}&leng=pt_br`;
    const res = await fetch(API_url);
    const data = await res.json();
    return data;

}

const mostrarClima = async (cidade) => {
    const data = await pegarDadosClima(cidade)
    local.innerText = cidade;
    bandeira.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    desc_img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    desc.innerText = data.weather[0].main;
    temp.innerText = parseInt(data.main.temp) + "ºC";
    ventos.innerText = data.wind.speed + "km/h";
    humidade.innerText = data.main.humidity + "%";
    containerPrinc.classList.remove('sumir');

}


// Adicionando eventos

search.addEventListener('click', (e) => {
    e.preventDefault();
    const cidade = input.value;
    mostrarClima(cidade)
});