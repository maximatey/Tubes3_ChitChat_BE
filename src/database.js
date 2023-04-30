// Note: Jika terdapat error saat membuat koneksi ke database, cek https://www.youtube.com/watch?v=W2TuIx2y4kw

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "Moore",
    password: "Moore07",
    database: "ChitChat"
});

/*
Fungsi untuk mengakses databases (read)
*/

function readDatabase(query) {
    return new Promise(function(resolve, reject) {
        con.query(
            query,
            function(err, rows) {
                if (rows === undefined) {
                    reject(new Error("Error rows is undefined"));
                } else {
                    resolve(rows);
                }
            }
        )
    })
}

/*
    Fungsi untuk mengubah databases (add, update, delete)
*/

function modifyDatabase(query) {
    con.query(
        query,
        function(err) {
            if (err) throw err;
        }
    )
}

/*
    fungsi untuk mencari jawaban dari pertanyaan pada database QnA
*/
function findAnswer(question) {
    // Load data from databases;
    let query = 'SELECT * FROM QnA';
    readDatabase(query)
        .then(function(data) {
            let found = false;
            let i = 0;
            // Periksa apakah pertanyaan sudah ada di database dengan string matching
            // Sementara, kalau sudah ada BM atau KMP nanti diganti
            while (i < data.length && !found) {
                if (data[i].question === question) {
                    found = true;
                } else {
                    i++;
                }
            }

            // Jika pertanyaan dapat dijawab dari database (kemiripan >= 90%), maka kembalikan id jawaban, alternatif "" (kosong)
            if (found) {
                return ([data[i].ID, ""]);
            } else {
                // Jika pertanyaan belum ada di database, maka kembalikan -1, dan alternatif jawaban
                // Cari alternatif jawaban dari database
                let alternative_answer = "";
                // Cari dengan algoritma penghitung kemiripan, ambil top 3 termirip 
                return ([-1, alternative_answer]);
            }
        })
}

/*
    Fungsi yang merepresentasikan menu addQnA
*/
function addQnA(question, answer) {
    // Check if question is already in database
    // If yes, modify the answer
    // If no, add the question and answer

    // Load data from databases;
    let query = 'SELECT * FROM QnA';
    readDatabase(query)
        .then(function(data) {
            let found = false;
            let i = 0;
            // Periksa apakah pertanyaan sudah ada di database dengan string matching
            // Sementara, kalau sudah ada BM atau KMP nanti diganti
            while (i < data.length && !found) {
                if (data[i].question === question) {
                    found = true;
                } else {
                    i++;
                }
            }

            // Jika pertanyaan sudah ada di database, maka ubah jawaban
            if (found) {
                let id = data[i].ID;
                query = `UPDATE QnA SET Answer = '${answer}' WHERE ID = '${id}'`;
            } else {
                // console.log("Pertanyaan belum ada di database");
                // Buat ID baru
                let id;
                if (data.length === 0) {
                    id = 10000000;
                } else {
                    id = data[data.length - 1].ID + 1;
                }
                // Jika pertanyaan belum ada di database, maka tambahkan pertanyaan dan jawaban
                query = `INSERT INTO QnA (ID, Question, Answer) VALUES ('${id}', '${question}', '${answer}')`;
            }

            // Ubah database
            modifyDatabase(query);
        })
}

/*
    Fungsi yang merepresentasikan menu addQnA
*/
function deleteQnA(question) {
    // Load data from databases;
    let query = 'SELECT * FROM QnA';
    readDatabase(query)
        .then(function(data) {
            let found = false;
            let i = 0;
            // Periksa apakah pertanyaan sudah ada di database dengan string matching
            // Sementara, kalau sudah ada BM atau KMP nanti diganti
            while (i < data.length && !found) {
                if (data[i].question === question) {
                    found = true;
                } else {
                    i++;
                }
            }

            // Jika pertanyaan ada di database, hapus row tersebut (drop QnA entry bersangkutan)
            if (found) {
                let id = data[i].ID;
                query = `DELETE FROM QnA WHERE ID = '${id}'`;
            } else {
                console.log("Pertanyaan belum ada di database");
            }

            // Ubah database
            modifyDatabase(query);
        })
}



/*
    Fungsi untuk menambahkan chat baru ke database chat
*/
function addChat(question, answer_ID, alternative_answer, hist_ID) {
    // Load data from databases;
    // Pada fungsi ini, jika terdapat jawaban pada databases (kemiripan > 90%), answer_ID bernilai ID jawaban tersebut, alternative answer ""
    // Jika tidak ada jawaban yang mirip, answer_ID bernilai -1 dan alternative_answer berisi jawaban yang merupakan rekomendasi pertanyaan

    let query = 'SELECT * FROM Chat';
    readDatabase(query)
        .then(function(data) {
            // Buat ID baru
            let chat_ID;
            if (data.length === 0) {
                chat_ID = 10000000;
            } else {
                chat_ID = data[data.length - 1].chat_ID + 1;
            }

            // Tambahkan chat baru ke database
            query = `INSERT INTO Chat (chat_ID, question, answer_ID, alternative_Answer, hist_ID) VALUES ('${chat_ID}', '${question}', '${answer_ID}', '${alternative_answer}', '${hist_ID}')`;

            // Ubah database
            modifyDatabase(query);
        })
}

/*
    Fungsi-fungsi yang digunakan untuk mengakses databases untuk table History
*/

function addHistory(title, date_created) {
    let query = 'SELECT * FROM History';
    readDatabase(query)
        .then(function(data) {
            // Buat ID baru
            let hist_ID;
            if (data.length === 0) {
                hist_ID = 10000000;
            } else {
                hist_ID = data[data.length - 1].hist_ID + 1;
            }

            // Tambahkan history baru ke database
            query = `INSERT INTO History (hist_ID, title, date_created, last_modified) VALUES ('${hist_ID}', '${title}', '${date_created}', '${date_created}')`;

            // Ubah database
            modifyDatabase(query);
        })
}

function deleteHistory(hist_ID) {
    // Load data from databases;
    let query;
    query = `DELETE FROM Chat WHERE hist_ID = '${hist_ID}'`;
    modifyDatabase(query);
    query = `DELETE FROM History WHERE histID = '${hist_ID}'`;
    modifyDatabase(query);
}

function updateLastModifiesHistory(hist_ID, last_modified) {
    let query = `UPDATE History SET last_modified = ${last_modified} WHERE hist_ID=${hist_ID}`;
    modifyDatabase(query);
}