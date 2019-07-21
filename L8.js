$(document).ready(() => {
    $('.btn').click(() => {
        $.ajax({
            url: "https://restcountries.eu/rest/v2/all",
            method: 'GET'
        }).done((data) => {
            buildTable(data);
        });
    })
});

function buildTable(received) {
    let htmlCode = '<table class="table"><thead><tr><th>название страны</th><th>столица</th><th>населениe</th><th>площадь</th><th>валюты</th><th>языки</th><th>флаг</th><th>граничит с</th></tr></thead><tbody>';
    for (let element of received) {
        htmlCode += `<tr><td>${element.name}</td><td>${element.capital}</td><td>${element.population}</td><td>${element.area}</td><td>`;
        for (let listCurrencies = 0; listCurrencies < element.currencies.length; listCurrencies++) {
            htmlCode += `${element.currencies[listCurrencies].name}`;
            if (listCurrencies + 1 < element.currencies.length) { htmlCode += ', ' };
        };
        htmlCode += `</td><td>`;
        for (let listLanguages = 0; listLanguages < element.languages.length; listLanguages++) {
            htmlCode += `${element.languages[listLanguages].name}`;
            if (listLanguages + 1 < element.languages.length) { htmlCode += ', ' };
        };
        htmlCode += `</td><td><img src="${element.flag}"></td><td>`;
        for (let listBorders = 0; listBorders < element.borders.length; listBorders++) {
            var a3code = element.borders[listBorders];
            for (let searchArray = 0; searchArray < received.length; searchArray++) {
                if (received[searchArray].alpha3Code === a3code) {
                    htmlCode += `${received[searchArray].name}`;
                    if (listBorders + 1 < element.borders.length) { htmlCode += ', ' };
                };
            };
        };

        htmlCode += `</td></tr>`;
    };
    htmlCode += '</tbody></table>';
    $('.htmlTable').html(htmlCode);
};