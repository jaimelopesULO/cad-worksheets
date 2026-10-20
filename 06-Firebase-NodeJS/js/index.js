// Worksheet 6 - Challenge B: mostrar as mensagens como alerts do Bootstrap
import { database } from "./firebase.js";
import { ref, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Tipos de alert aceites (os mesmos que o Node.js usa)
const allowedTypes = ["success", "warning", "danger", "primary"];

// Contentor onde as mensagens vão aparecer
const messagesContainer = document.getElementById("messages");

// 1. Referência ao nó "messages"
const messagesRef = ref(database, "messages");

// 2. Corre uma vez por cada mensagem que já existe e outra vez sempre que chega uma nova
onChildAdded(messagesRef, function (snapshot) {
    const message = snapshot.val();

    // Se o tipo não for um dos 4 aceites, usa "primary"
    const type = allowedTypes.includes(message.type) ? message.type : "primary";

    // 3. Criar o alert do Bootstrap
    const alert = document.createElement("div");
    alert.className = "alert alert-" + type;
    alert.setAttribute("role", "alert");
    alert.textContent = message.text;

    // 4. Acrescentar o alert ao contentor
    messagesContainer.appendChild(alert);
}, function (error) {
    // Callback de erro: por exemplo, sem permissão de leitura
    console.error("Erro ao ler as mensagens:", error.message);

    const alert = document.createElement("div");
    alert.className = "alert alert-danger";
    alert.textContent = "Erro ao ler as mensagens: " + error.message;
    messagesContainer.appendChild(alert);
});
