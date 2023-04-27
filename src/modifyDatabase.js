// Note: Jika terdapat error saat membuat koneksi ke database, cek https://www.youtube.com/watch?v=W2TuIx2y4kw

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "Moore",
    password: "Moore07",
    database: "ChitChat"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

/*
Fungsi untuk mengakses databases (read)
*/
function readDatabase(query) {
    let output;
    const setOutput = (rows) => {
        output = rows;
        console.log(output);
    }

    con.query(query, (err, rows) => {
        if (err) {
            console.log("internal error", err);
            return;
        }
        // This is the important function
        setOutput(rows);
    });
    return output;
}






/*
    Fungsi-fungsi yang digunakan untuk mengakses databases untuk table QnA
*/
function addQnA(question, answer) {
    // Check if question is already in database
    // If yes, modify the answer
    // If no, add the question and answer

    // Load data from databases;
    let query = 'SELECT * FROM QnA';
    let data = readDatabase(query);
    console.log(data);

}

function deleteQnA() {

}

function modifyQnA() {

}

/*
    Fungsi-fungsi yang digunakan untuk mengakses databases untuk table Chat
*/
function addChat() {

}

function deleteChat() {

}

/*
    Fungsi-fungsi yang digunakan untuk mengakses databases untuk table History
*/

function addHistory() {

}

function deleteHistory() {

}

function modifyHistory() {

}


addQnA("Apa kabar?", "Baik");