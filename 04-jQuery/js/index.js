var app = (function () {
    'use strict';
    // Your code goes here!

    // d) Muda o ícone e a cor conforme o botão está on ou off
    function updateIcon($toggle) {
        var iconId = $toggle.attr('id').replace('Toggle', 'Icon');
        var $icon = $('#' + iconId);

        if ($toggle.attr('id') === 'ambientMusicToggle') {
            // Música
            if ($toggle.val() === 'on') {
                $icon.attr('class', 'fa-solid fa-music fa-fw text-success');
            } else {
                $icon.attr('class', 'fa-solid fa-volume-xmark fa-fw text-danger');
            }
        } else {
            // Luzes
            if ($toggle.val() === 'on') {
                $icon.attr('class', 'fa-solid fa-lightbulb fa-fw text-warning');
            } else {
                $icon.attr('class', 'fa-regular fa-lightbulb fa-fw');
            }
        }
    }

    // e) Número aleatório entre 10 e 30, com 1 casa decimal
    function randomTemperature() {
        return (Math.random() * 20 + 10).toFixed(1);
    }

    function updateTemperatures() {
        $('#kitchenTemperature').text(randomTemperature());
        $('#livingRoomTemperature').text(randomTemperature());
    }

    // f) Relógio
    function twoDigits(number) {
        return String(number).padStart(2, '0');
    }

    function updateDate() {
        var now = new Date();
        $('#clockDate').text(now.getFullYear() + '-' + twoDigits(now.getMonth() + 1) + '-' + twoDigits(now.getDate()));
    }

    function updateTime() {
        var now = new Date();
        $('#clockTime').text(twoDigits(now.getHours()) + ':' + twoDigits(now.getMinutes()) + ':' + twoDigits(now.getSeconds()));
    }

    
    // 2 b) Tempo: dados da API do OpenWeatherMap
    var API_KEY = '068a49de1d819b518a7314a974acca8e';

    // Converte segundos Unix (formato da API) numa hora HH:MM
    function unixToTime(seconds) {
        var date = new Date(seconds * 1000);
        return twoDigits(date.getHours()) + ':' + twoDigits(date.getMinutes());
    }

    // 2 c) Momento em que os dados do tempo foram obtidos (null = ainda não há dados)
    var lastWeatherUpdate = null;

    // Mostra há quanto tempo os dados foram obtidos: segundos, minutos ou horas
    function updateLastUpdate() {
        if (lastWeatherUpdate === null) {
            return; // ainda não há dados: não faz nada
        }

        var seconds = Math.floor((new Date() - lastWeatherUpdate) / 1000);
        var text;

        if (seconds < 60) {
            text = seconds + ' seconds ago';
        } else if (seconds < 3600) {
            text = Math.floor(seconds / 60) + ' minutes ago';
        } else {
            text = Math.floor(seconds / 3600) + ' hours ago';
        }

        $('#weatherLastUpdate').text(text);
    }

    // Escreve os dados recebidos da API no painel Weather
    function showWeather(data) {
        $('#weatherTemperature').text(data.main.temp);
        $('#weatherTemperatureMax').text(data.main.temp_max);
        $('#weatherTemperatureMin').text(data.main.temp_min);
        $('#weatherHumidity').text(data.main.humidity);
        $('#weatherSunrise').text(unixToTime(data.sys.sunrise));
        $('#weatherSunset').text(unixToTime(data.sys.sunset));

        lastWeatherUpdate = new Date(); // c) guarda o momento em que os dados chegaram
        updateLastUpdate();             // c) mostra logo "0 seconds ago"
    }

    // Pede os dados do tempo à API para a cidade escrita na caixa
    function getWeather() {
        var city = $('#weatherCity').val();
        var url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' +
                  encodeURIComponent(city) + '&appid=' + API_KEY;

        $.getJSON(url)
            .done(function (data) {
                showWeather(data);
            })
            .fail(function (jqXHR) {
                lastWeatherUpdate = null; // c) sem dados válidos, pára a contagem
                console.log('Erro ao obter o tempo: ' + jqXHR.status);
                $('#weatherLastUpdate').text('Erro ' + jqXHR.status);
            });
    }

    // Só corre quando a página (HTML) estiver toda carregada
    $(function () {

        // a), c) e d) Botões das luzes e da música
        $('.form-check-input').each(function () {
            var $toggle = $(this);

            updateIcon($toggle); // acerta o ícone quando a página abre

            $toggle.on('click', function () {
                // c) O valor alterna entre on e off
                if ($toggle.val() === 'on') {
                    $toggle.val('off');
                } else {
                    $toggle.val('on');
                }

                updateIcon($toggle); // d) muda o ícone depois de cada clique

                console.log($toggle.attr('id') + ' = ' + $toggle.val());
            });
        });

        // e) Temperaturas a cada 5 segundos
        setInterval(updateTemperatures, 5000);

        // f) Data ao carregar e hora a cada segundo
        updateDate();
        updateTime();
        setInterval(updateTime, 1000);

    
        // 2 b) Tempo: carrega ao abrir a página e quando se clica em "Get"
        getWeather();
        $('#weatherButton').on('click', getWeather);

        // 2 c) Atualiza o "Last Update" a cada segundo
        setInterval(updateLastUpdate, 1000);

    });

})();