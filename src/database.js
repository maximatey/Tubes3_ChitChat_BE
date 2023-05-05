// Note: Jika terdapat error saat membuat koneksi ke database, cek https://www.youtube.com/watch?v=W2TuIx2y4kw

const searchBM = require('./BM.js').searchBM;
// import { searchBM } from './BM.js'; // Jika terhubung ke frontend
const searchKMP = require('./KMP.js').searchKMP;
// import { searchKMP } from './KMP.js'; // Jika terhubung ke frontend

const levenshteinDistance = require('./levenshtein_distance.js').levenshteinDistance;


var mysql = require('mysql');
var con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12615913",
    password: "Q6v4VUuCTx",
    database: "sql12615913"
});

// con.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database!');
//   });


/*
Fungsi untuk mengakses databases (read)
*/

function readDatabase(query) {
    return new Promise(function(resolve, reject) {
        con.query(
                query,
                function(err, rows) {
                    if (rows === undefined) {
                        resolve([]);
                    } else {
                        resolve(rows);
                    }
                }
            )
            // con.end();
    })
}

/*
    Fungsi untuk mengubah databases (add, update, delete)
*/

function modifyDatabase(query, values) {
    con.query(
            query, values,
            function(err) {
                if (err) throw err;
            }
        )
        // con.end();
}

/*
    fungsi untuk mencari jawaban dari pertanyaan pada database QnA
*/
function getAnswer(question, algorithm) {
    // Load data from databases;
    // QnA pada database paling tidak memiliki 3 entry
    // Algorithm pasti bernilai BM atau KMP
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM QnA';
        readDatabase(query)
            .then(function(data) {
                let found = false;
                let i = 0;
                let answers;
                let answerlist = [];

                // Periksa apakah pertanyaan sudah ada di database dengan string matching
                if (algorithm === "BM") {
                    // Menggunakan algoritma Boyer Moore
                    // Cari semua pertanyaan yang exact match
                    for (let i = 0; i < data.length; i++) {
                        // Jika exact match, masukkan ke answerlist
                        if (searchBM(question, data[i].question) != -1) {
                            answerlist.push(data[i]);
                        }
                    }

                } else {
                    // Menggunakan algoritma Knuth Morris Pratt
                    // Cari semua pertanyaan yang exact match
                    for (let i = 0; i < data.length; i++) {
                        // Jika exact match, masukkan ke answerlist
                        if (searchKMP(question, data[i].question) != -1) {
                            answerlist.push(data[i]);
                        }
                    }
                }


                // Jika lebih dari 1 exact match cari yang termirip
                if (answerlist.length > 1) {
                    let max = 0;
                    let max_index = 0;

                    for (let i = 0; i < answerlist.length; i++) {
                        let similarity = (1 - levenshteinDistance(question, answerlist[i].question) / Math.min(question.length, answerlist[i].question.length));
                        if (similarity > max) {
                            max = similarity;
                            max_index = i;
                        }
                    }

                    answers = [answerlist[max_index].answer, answerlist[max_index].ID, ""]; // ID jawaban, alternatif jawaban
                } else if (answerlist.length == 1) {
                    answers = [answerlist[0].answer, answerlist[0].ID, ""]; // ID jawaban, alternatif jawaban
                } else {
                    // Jika tidak ada exact match, cari yang termirip dengan kemiripan >= 90%, jika tidak ada 
                    // alternative answer diisi dengan 3 jawaban yang paling mirip

                    // Cari kemiripan untuk semua question yang ada di database
                    let similaritylist = [];
                    for (let i = 0; i < data.length; i++) {
                        similarity = [i, 1 - levenshteinDistance(question, data[i].question) / Math.min(question.length, data[i].question.length)];

                        if (similaritylist.length == 0) {
                            similaritylist.push(similarity);
                        } else {
                            let j = 0;
                            while (j < similaritylist.length && similaritylist[j][1] >= similarity[1]) {
                                j++;
                            }
                            similaritylist.splice(j, 0, similarity);
                        }
                    }

                    // Cek apabila kemiripan terbesar >= 90%
                    // console.log(similaritylist);
                    if (similaritylist[0][1] >= 0.9) {
                        answers = [data[similaritylist[0][0]].answer, data[similaritylist[0][0]].ID, ""]; // ID jawaban, alternatif jawaban
                    } else {
                        // Jika tidak ada yang mirip, kembalikan -1 dan alternatif jawaban
                        let alternative_answer = "";
                        alternative_answer += "Pertanyaan tidak ditemukan di database \n Apakah maksud anda: \n";
                        for (let i = 0; i < 3; i++) {
                            alternative_answer += ((i + 1) + ". " + data[similaritylist[i][0]].question + "\n");
                        }
                        answers = ["", -1, alternative_answer];
                    }

                }
                resolve(answers);
            })
    })
}

/*
    Fungsi yang merepresentasikan menu addQnA
*/
function addQnA(question, answer, algorithm) {
    // Check if question is already in database
    // If yes, modify the answer
    // If no, add the question and answer

    // Load data from databases;
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM QnA';
        readDatabase(query)
            .then(function(data) {
                let found = false;
                let ID = 0;
                // Periksa apakah pertanyaan sudah ada di database dengan string matching.Jika exact match, pertanyaan sudah ada dalam database
                let questionlist = [];

                // Periksa apakah pertanyaan sudah ada di database dengan string matching
                if (algorithm === "BM") {
                    // Menggunakan algoritma Boyer Moore
                    // Cari semua pertanyaan yang exact match
                    for (let i = 0; i < data.length; i++) {
                        // Jika exact match, masukkan ke questionlist
                        if (searchBM(question, data[i].question) != -1) {
                            found = true;
                            questionlist.push(data[i]);
                        }
                    }

                } else {
                    // Menggunakan algoritma Knuth Morris Pratt
                    // Cari semua pertanyaan yang exact match
                    for (let i = 0; i < data.length; i++) {
                        // Jika exact match, masukkan ke aquestionlist
                        if (searchKMP(question, data[i].question) != -1) {
                            found = true;
                            questionlist.push(data[i]);
                        }
                    }
                }


                // Jika lebih dari 1 exact match cari yang termirip
                if (questionlist.length > 1) {
                    let max = 0;
                    let max_index = 0;

                    for (let i = 0; i < answerlist.length; i++) {
                        let similarity = (1 - levenshteinDistance(question, questionlist[i].question) / Math.min(question.length, questionlist[i].question.length));
                        if (similarity > max) {
                            max = similarity;
                            max_index = i;
                        }
                    }

                    ID = questionlist[max_index].ID;
                } else if (questionlist.length == 1) {
                    ID = questionlist[0].ID;
                }

                // Jika pertanyaan sudah ada di database, maka ubah jawaban
                if (found) {
                    query = `UPDATE QnA SET Answer = '${answer}' WHERE ID = '${ID}'`;
                    answer = `Pertanyaan ${question} sudah ada! jawaban diupdate ke ${answer}`;
                } else {
                    // console.log("Pertanyaan belum ada di database");
                    // Buat ID baru
                    let id;
                    if (data.length === 0) {
                        id = 10000000;
                    } else {
                        id = parseInt(data[data.length - 1].ID) + 1;
                    }
                    // Jika pertanyaan belum ada di database, maka tambahkan pertanyaan dan jawaban
                    query = `INSERT INTO QnA (ID, Question, Answer) VALUES ('${id}', '${question}', '${answer}')`;
                    answer = `Pertanyaan ${question} telah ditambahkan`;
                }

                // Ubah database
                modifyDatabase(query);
                resolve(answer);
            })
    })
}

/*
    Fungsi yang merepresentasikan menu addQnA
*/
function deleteQnA(question, algorithm) {
    // Load data from databases;
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM QnA';
        readDatabase(query)
            .then(function(data) {
                let found = false;
                let ID = 0;
                // Periksa apakah pertanyaan sudah ada di database dengan string matching.Jika exact match, pertanyaan sudah ada dalam database
                let questionlist = [];
                // Periksa apakah pertanyaan sudah ada di database dengan string matching
                // Periksa apakah pertanyaan sudah ada di database dengan string matching
                if (algorithm === "BM") {
                    // Menggunakan algoritma Boyer Moore
                    // Cari semua pertanyaan yang exact match
                    for (let i = 0; i < data.length; i++) {
                        // Jika exact match, masukkan ke questionlist
                        if (searchBM(question, data[i].question) != -1) {
                            found = true;
                            questionlist.push(data[i]);
                        }
                    }

                } else {
                    // Menggunakan algoritma Knuth Morris Pratt
                    // Cari semua pertanyaan yang exact match
                    for (let i = 0; i < data.length; i++) {
                        // Jika exact match, masukkan ke aquestionlist
                        if (searchKMP(question, data[i].question) != -1) {
                            found = true;
                            questionlist.push(data[i]);
                        }
                    }
                }


                // Jika lebih dari 1 exact match cari yang termirip
                if (questionlist.length > 1) {
                    let max = 0;
                    let max_index = 0;

                    for (let i = 0; i < answerlist.length; i++) {
                        let similarity = (1 - levenshteinDistance(question, questionlist[i].question) / Math.min(question.length, questionlist[i].question.length));
                        if (similarity > max) {
                            max = similarity;
                            max_index = i;
                        }
                    }

                    ID = questionlist[max_index].ID;
                } else if (questionlist.length == 1) {
                    ID = questionlist[0].ID;
                }

                // Jika pertanyaan ada di database, hapus row tersebut (drop QnA entry bersangkutan)
                if (found) {
                    query = `DELETE FROM QnA WHERE ID = '${ID}'`;
                    answer = `Pertanyaan ${question} telah dihapus`;
                } else {
                    answer = `Pertanyaan ${question} tidak ada di database`;
                }

                // Ubah database
                modifyDatabase(query);
                resolve(answer);
            })
    })
}



/*
    Fungsi untuk menambahkan chat baru ke database chat
*/
function addChat(question, answer, hist_ID) {
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
                chat_ID = parseInt(data[data.length - 1].chat_ID) + 1;
            }

            // Tambahkan chat baru ke database
            query = `INSERT INTO Chat (chat_ID, question, answer, hist_ID) VALUES ('${chat_ID}', '${question}', '${answer}','${hist_ID}')`;

            // Ubah database
            modifyDatabase(query);
        })
}

/*
    Fungsi-fungsi yang digunakan untuk mengakses databases untuk table History
*/

function addHistory(title) {
    let query = 'SELECT * FROM History';
    readDatabase(query)
        .then(function(data) {
            // Buat ID baru
            let hist_ID;
            if (data.length === 0) {
                hist_ID = 10000000;
            } else {
                hist_ID = parseInt(data[data.length - 1].hist_ID) + 1;
            }
            let date = new Date();
            date.setHours(date.getHours() + 7); // gmt + 7
            let date_created = date.toISOString().slice(0, 19).replace('T', ' ');
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
    query = `DELETE FROM History WHERE hist_ID = '${hist_ID}'`;
    modifyDatabase(query);
}

function updateLastModifiesHistory(hist_ID) {
    let date = new Date();
    date.setHours(date.getHours() + 7); // gmt + 7
    let last_modified = date.toISOString().slice(0, 19).replace('T', ' ');
    let query = "UPDATE History SET last_modified=?  WHERE hist_ID=?";
    let values = [last_modified, hist_ID];
    modifyDatabase(query, values);
}

function getHistoryInfo() {
    return new Promise(function(resolve, reject) {
        let query = 'SELECT title, hist_ID FROM History';
        readDatabase(query).then(function(data) {
            resolve(data);
        })
    })
}

function getChats(hist_ID) {
    return new Promise(function(resolve, reject) {
        let query = 'SELECT question, answer FROM Chat';
        readDatabase(query).then(function(data) {
            resolve(data);
        })
    })
}

// export { getAnswer, addQnA, deleteQnA, addChat, addHistory, deleteHistory, updateLastModifiesHistory }
module.exports = { getAnswer, addQnA, deleteQnA, addChat, getHistoryInfo, addHistory, updateLastModifiesHistory, getChats }