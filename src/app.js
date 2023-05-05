const express = require('express')
const cors = require('cors')
const app = express()
const chatRoute = require('./router/chatHistory')
const con = require('./database').con

// app.get("/", (req, res) => {
//     res.send('Hello World!');
// })

const corsOptions = { origin: "http://localhost:5173/" }
app.use(express.json())
app.use(cors(corsOptions))

// con.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database!');
// });

app.use("/chat", chatRoute)

app.listen(5000, () => { console.log("Server started on port 5000") })