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
    });

})();