// Worksheet 6 - Challenge C: enviar uma mensagem aleatória a cada 5 segundos

// Carregar o Admin SDK e a chave privada (service account)
const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const serviceAccount = require('./serviceAccountKey.json');

// Endereço EXATO da Realtime Database
const DATABASE_URL = 'https://cad-2022147588-default-rtdb.europe-west1.firebasedatabase.app';

// Inicializar o Admin SDK com a chave privada e o databaseURL
initializeApp({
    credential: cert(serviceAccount),
    databaseURL: DATABASE_URL
});

// Obter a base de dados e uma referência ao nó "messages"
const database = getDatabase();
const messagesRef = database.ref('messages');

// 1. Lista de frases
const sentences = [
    'A new request was received.',
    'The kitchen lights were turned on.',
    'The living room temperature is above 25 °C.',
    'Someone rang the bell.',
    'The north window is open.',
    'The ambient music was turned off.',
    'The backup finished successfully.',
    'Low battery on the door sensor.'
];

// 2. Lista de tipos de alert
const types = ['success', 'warning', 'danger', 'primary'];

// Devolve um elemento ao acaso de uma lista
function randomItem(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

// 3. Escolhe uma frase e um tipo ao acaso (independentes) e adiciona a mensagem a "messages"
function sendRandomMessage() {
    const message = {
        text: randomItem(sentences),
        type: randomItem(types)
    };

    messagesRef.push(message)
        .then(function (newRef) {
            console.log('[' + message.type + '] ' + message.text + ' (chave: ' + newRef.key + ')');
        })
        .catch(function (error) {
            console.error('Erro ao guardar a mensagem:', error.message);
        });
}

// 4. Envia uma mensagem logo ao arrancar e depois a cada 5000 ms (5 segundos)
console.log('A enviar uma mensagem a cada 5 segundos. Carrega em Ctrl+C para parar.');
sendRandomMessage();
setInterval(sendRandomMessage, 5000);
