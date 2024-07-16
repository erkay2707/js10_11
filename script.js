const countryNames = 'https://restcountries.com/v3.1/region/europe';
const selectCountry = document.querySelector('#select');
const div = document.querySelector('#div');
const weatherApiKey = 'fdf7436d2ba24133bf383249241607'; // Замените на ваш API ключ

let dateAll = [];

fetch(countryNames)
    .then(res => res.json())
    .then(data => {
        dateAll = data;
        selectCountry.innerHTML += data.map(country => {
            return `<option class="options" id="${country.name.common}">${country.name.common}</option>`;
        }).join('');
    })
    .catch(error => {
        console.error('Error fetching country names:', error);
    });

selectCountry.addEventListener('change', (e) => {
    const selectedOption = e.target.selectedOptions[0];
    console.log(selectedOption.id);
    dateAll.forEach((item) => {
        let array = Object.keys(item.languages);
        let valuta = Object.keys(item.currencies);
        if (item.name.common === selectedOption.id) {
            div.innerHTML = `
                <img src="${item.flags.png}" alt="Flag of ${item.name.common}">
                <span>Страна: ${item.translations.rus.common}</span>
                <span>Столица: ${item.capital}</span>
                <span>Язык: ${item.languages[array[0]]}</span>
                <span>Валюта: ${item.currencies[valuta[0]].name}</span>
            `;
            getWeather(item.capital);
        }
    });
});



function getWeather(capital) {

    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${capital}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
                const weatherDiv = `
                    <span>Погода в ${capital}</span>
                    <span>Температура: ${weatherData.current.temp_c}°C</span>
                `
            div.innerHTML += weatherDiv;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            div.innerHTML += `<span>Ошибка данных</span>`;
        });
}
