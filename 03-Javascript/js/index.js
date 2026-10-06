var app = (function () {
    'use strict';
    // Your code goes here!

    // d) Muda o ícone e a cor conforme o botão está on ou off
    function updateIcon(toggle) {
        var iconId = toggle.id.replace('Toggle', 'Icon');
        var icon = document.getElementById(iconId);

        if (toggle.id === 'ambientMusicToggle') {
            // Música
            if (toggle.value === 'on') {
                icon.className = 'fa-solid fa-music fa-fw text-success';
            } else {
                icon.className = 'fa-solid fa-volume-xmark fa-fw text-danger';
            }
        } else {
            // Luzes
            if (toggle.value === 'on') {
                icon.className = 'fa-solid fa-lightbulb fa-fw text-warning';
            } else {
                icon.className = 'fa-regular fa-lightbulb fa-fw';
            }
        }
    }

    // a) Responder aos cliques nos botões das luzes e da música
    var toggles = document.querySelectorAll('.form-check-input');

    toggles.forEach(function (toggle) {
        updateIcon(toggle); // d) acerta o ícone logo quando a página abre

        toggle.addEventListener('click', function () {
            // c) O valor alterna entre on e off
            if (toggle.value === 'on') {
                toggle.value = 'off';
            } else {
                toggle.value = 'on';
            }

            updateIcon(toggle); // d) muda o ícone depois de cada clique

            console.log(toggle.id + ' = ' + toggle.value);
        });
    });

    // e) Atualiza as temperaturas a cada 5 segundos com um valor aleatório entre 10 e 30
    function randomTemperature() {
        return (Math.random() * 20 + 10).toFixed(1);
    }

    function updateTemperatures() {
        document.getElementById('kitchenTemperature').textContent = randomTemperature();
        document.getElementById('livingRoomTemperature').textContent = randomTemperature();
    }

    setInterval(updateTemperatures, 5000);

    // f) Relógio: data quando a página carrega e hora atualizada a cada segundo
    function twoDigits(number) {
        return String(number).padStart(2, '0');
    }

    function updateDate() {
        var now = new Date();
        document.getElementById('clockDate').textContent =
            now.getFullYear() + '-' + twoDigits(now.getMonth() + 1) + '-' + twoDigits(now.getDate());
    }

    function updateTime() {
        var now = new Date();
        document.getElementById('clockTime').textContent =
            twoDigits(now.getHours()) + ':' + twoDigits(now.getMinutes()) + ':' + twoDigits(now.getSeconds());
    }

    updateDate();
    updateTime();
    setInterval(updateTime, 1000);

})();