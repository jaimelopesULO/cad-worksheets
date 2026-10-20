// Worksheet 6 - Challenge B: configurar o Firebase (Web SDK) e exportar a base de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuração da Web app (Firebase console > Project settings)
const firebaseConfig = {
    apiKey: "AIzaSyAFyq-GuS7PSiYvy_JdXBLL5MwqKCHtJUg",
    authDomain: "cad-2022147588.firebaseapp.com",
    databaseURL: "https://cad-2022147588-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cad-2022147588",
    storageBucket: "cad-2022147588.firebasestorage.app",
    messagingSenderId: "337501335474",
    appId: "1:337501335474:web:201e5d3b60b18f5031feab"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
