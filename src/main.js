const classification = require('./regex.js').classification; // import function classification jika tak terhubung frontend
const calculator = require('./calculator_feature.js').calculator; // import function calculator jika tak terhubung frontend
const checkDay = require('./date_feature.js').checkDay; // import function checkDay jika tak terhubung frontend
const getAnswer = require('./database.js').getAnswer; // import function getAnswer jika tak terhubung frontend
const addQnA = require('./database.js').addQnA; // import function addQnA jika tak terhubung frontend
const deleteQnA = require('./database.js').deleteQnA; // import function deleteQnA jika tak terhubung frontend
const addChat = require('./database.js').addChat; // import function addChat jika tak terhubung frontend
const getHistoryInfo = require('./database.js').getHistoryInfo; // import function getHistoryInfo jika tak terhubung frontend
const getChats = require('./database.js').getChats; // import function getChats jika tak terhubung frontend
const addHistory = require('./database.js').addHistory; // import function addHistory jika tak terhubung frontend
const updateLastModifiesHistory = require('./database.js').updateLastModifiesHistory; // import function updateLastModifiesHistory jika tak terhubung frontend

// import { classification } from './regex.js'; // import function classification jika terhubung frontend
// import { calculator } from './calculator_feature.js'; // import function calculator jika terhubung frontend
// import { checkDay } from './date_feature.js'; // import function checkDay jika terhubung frontend
// import { getAnswer, addQnA, deleteQnA, addChat, addHistory, deleteHistory, updateLastModifiesHistory } from './database.js'; // import function addChat, addHistory, deleteHistory, updateLastModifiesHistory jika terhubung frontend

// Fungsi yang handling response terhadap user input di dalam chatbot
function getServices(userInput, hist_ID, algorithm) {
    // Panggil fungsi classification untuk mengklasifikasi input user
    serviceType = classification(userInput);

    // Simpan entry chat baru
    let question_chat = userInput;
    let answer_chat = null;



    // Preprocessing input user
    userInput = userInput.toLowerCase();
    userInput = userInput.replace('?', '');
    userInput = userInput.trim();
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
            answer_chat = checkDay(day, month, year);
            console.log(answer_chat);
            break;
        case 2:
            // Panggil service kalkulator
            console.log("Kalkulator");
            answer_chat = calculator(userInput);
            console.log(answer_chat);
            break;
        case 3:
            // Panggil service addQnA
            userInput = userInput.replace(' dengan jawaban ', ';');
            userInput = userInput.replace('tambah pertanyaan', '');
            userInput = userInput.trim();

            userInputArr = userInput.split(';');
            addQnA(userInputArr[0], userInputArr[1], algorithm).then(function(answer) {
                answer_chat = answer;
                console.log(answer_chat);
                // Tambahkan entry chat baru ke database
                addChat(question_chat, answer_chat, hist_ID);

                // Perbarui last modified dari history
                updateLastModifiesHistory(hist_ID);
            });
            break;
        case 4:
            // Panggil service deleteQnA
            userInput = userInput.replace('hapus pertanyaan', '');
            deleteQnA(userInput.trim(), algorithm).then(function(answer) {
                answer_chat = answer;
                console.log(answer_chat);
                // Tambahkan entry chat baru ke database
                addChat(question_chat, answer_chat, hist_ID);

                // Perbarui last modified dari history
                updateLastModifiesHistory(hist_ID);
            });
            break;
        case 5:
            // Panggil service getAnswer
            console.log("Mencari Jawaban");
            // Dapatkan jawaban dari database
            getAnswer(userInput, algorithm).then(function(answers) {
                if (answers[0] != "") {
                    answer_chat = answers[1];
                    console.log(answers[0]);
                } else {
                    answer_chat = answers[2];
                    console.log(answers[2]);
                }

                // Tambahkan entry chat baru ke database
                addChat(question_chat, answer_chat, hist_ID);

                // Perbarui last modified dari history
                updateLastModifiesHistory(hist_ID);
            });
            break;
    }

    // Jika bukan service asycnhronous, jika service asynchronous maka entry chat baru akan dilakukan pada case yang sesuai
    if (serviceType == 1 || serviceType == 2) {
        // Tambahkan entry chat baru ke database
        addChat(question_chat, answer_chat, hist_ID);

        // Perbarui last modified dari history
        updateLastModifiesHistory(hist_ID);
    }
}

// Fungsi untuk mengembalikan semua title dan id dari history yang ada
function getHistory() {
    return new Promise(function(resolve, reject) {
        getHistoryInfo().then(function(history) {
            resolve(history);
        })
    })
}

// Fungsi untuk mengembalikan semua chat dari history tertentu
function getChatHistory(hist_ID) {
    return new Promise(function(resolve, reject) {
        getChats(hist_ID).then(function(chats) {
            let logs = [];
            for (let i = 0; i < chats.length; i++) {
                logs.push(chats[i].question);
                logs.push(chats[i].answer);
            }
            resolve(logs);
        })
    })
}

// Fungsi untuk menambahkan history baru
function createNewHistory(title) {
    addHistory(title)
}

module.exports = { getServices, getHistory, getChatHistory, createNewHistory };
// getServices("Tambah pertanyaan apa ibukota prancis? dengan jawaban paris", 10000000);
// getServices("Hapus pertanyaan apa ibukota italia?", 10000000);
// getServices("4+5", 10000000);
// getServices("30/04/2023", 10000000);
// getServices("apa ibukota indonsa");

// getHistory();
// getChatHistory(10000000);
// createNewHistory("History Baru");