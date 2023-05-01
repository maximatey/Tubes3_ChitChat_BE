const classification = require('./regex.js').classification; // import function classification jika tak terhubung frontend
const calculator = require('./calculator_feature.js').calculator; // import function calculator jika tak terhubung frontend
const checkDay = require('./date_feature.js').checkDay; // import function checkDay jika tak terhubung frontend
const getAnswer = require('./database.js').getAnswer; // import function getAnswer jika tak terhubung frontend
const addQnA = require('./database.js').addQnA; // import function addQnA jika tak terhubung frontend
const deleteQnA = require('./database.js').deleteQnA; // import function deleteQnA jika tak terhubung frontend
const addChat = require('./database.js').addChat; // import function addChat jika tak terhubung frontend
const addHistory = require('./database.js').addHistory; // import function addHistory jika tak terhubung frontend
const deleteHistory = require('./database.js').deleteHistory; // import function deleteHistory jika tak terhubung frontend
const updateLastModifiesHistory = require('./database.js').updateLastModifiesHistory; // import function updateLastModifiesHistory jika tak terhubung frontend

// import { classification } from './regex.js'; // import function classification jika terhubung frontend
// import { calculator } from './calculator_feature.js'; // import function calculator jika terhubung frontend
// import { checkDay } from './date_feature.js'; // import function checkDay jika terhubung frontend
// import { getAnswer, addQnA, deleteQnA, addChat, addHistory, deleteHistory, updateLastModifiesHistory } from './database.js'; // import function addChat, addHistory, deleteHistory, updateLastModifiesHistory jika terhubung frontend


// Fungsi yang handling response terhadap user input di dalam chatbot
function getServices(userInput) {
    // Panggil fungsi classification untuk mengklasifikasi input user
    serviceType = classification(userInput);
    let userInputArr;
    // Panggil fungsi yang sesuai dengan serviceType
    switch (serviceType) {
        case 1:
            // Panggil service tanggal
            console.log("Tanggal");
            const check = userInput.split('/');
            const day = parseInt(check[0].replace(/[^0-9]/g, ''));
            const month = parseInt(check[1]);
            const year = parseInt(check[2]);
            console.log(checkDay(day, month, year));
            break;
        case 2:
            // Panggil service kalkulator
            console.log("Kalkulator");
            console.log(calculator(userInput.replace('?', '')));
            break;
        case 3:
            // Panggil service addQnA
            userInputArr = userInput.split(' ');
            addQnA(userInputArr[2], userInputArr[5]);
            console.log("Tambah QnA");
            break;
        case 4:
            // Panggil service deleteQnA
            userInputArr = userInput.split(' ');
            deleteQnA(userInputArr[2]);
            console.log("Hapus QnA");
            break;
        case 5:
            // Panggil service getAnswer
            console.log("Mencari Jawaban");
            break;
    }
}
// getServices("Tambah pertanyaan x dengan jawaban y");
// getServices("Hapus pertanyaan x");
// getServices("4+5");
// getServices("30/04/2023");