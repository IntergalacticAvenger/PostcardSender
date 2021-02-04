const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sqlite = require('sqlite3').verbose(); //add sqlite3 package
const router = express.Router();



const app = express();
// Public -> HTML/CSS/Script  Images -> uploads stored
app.use(express.static("public"));
app.use("/images",express.static('images'));
app.use(express.json()); // data sent as JSON

// ROUTING?
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// app.get('/display', (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.get('/display.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/recipient.html'));
});



// // adding route?
//  app.use('/', router);




// Create interface to file -> if it exists
// If it doesn't exist -> make file
const myDB = new sqlite.Database('postcards.db');

// Table creation -> runs if 'postcard.db' is NOT FOUND / EMPTY ^^
let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name ='postcardTable' ";
myDB.get(cmd, (err, val) => {
    console.log(err, val);
    if (val == undefined) {
        console.log("No database file -> creating one! ");
        createDB();
    } else {
        console.log("Database file found");
    }
});

// make our DB from scratch with the cmd
function createDB() {
    // our query where we INIT our sql table
    const cmd = "CREATE TABLE postcardTable ( rowIdNum INTEGER PRIMARY KEY, photo TEXT, message TEXT, font TEXT, color TEXT, queryStr TEXT ) ";
    myDB.run(cmd, (err, val) => {
        if (err) {
            console.log("Database creation failure", err.message);
        } else {
            console.log("Create Database");
        }
    });
}
// SELECT * FROM postcardTable WHERE queryStr = KHnXw0pYn4WttcA7chKUaV



// Make a "storage" object that explains to multer where to store the images...in /images
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/images')
    },
    // keep the file's original name
    // the default behavior is to make up a random string
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// Use that storage object we just made to make a multer object that knows how to
// parse FormData objects and store the files they contain
let uploadMulter = multer({
    storage: storage
});

// GETS IMAGE (SCRIPT.JS) -> SEND TO INDEX.HTML
app.post('/upload', uploadMulter.single('newImage'), (req, res) => {
    console.log("File Received!");
    if (req.file) {
        res.end("Server received: \n" + req.file.originalname);
    } else {
        throw 'error';
    }
});

// GETS JSON (INDEX.HTML) -> SEND TO POSTCARD.JSON
// app.post('/display', (req, res) => {
//     console.log(req.body);
//     var data = JSON.stringify(req.body);
//     fs.writeFileSync('./postcardData.json', data)
//     console.log("Upload Complete!")
// });


// READ POSTCARD.JSON -> SEND TO SCRIPT.JS (FOR RECIPIENT.HTML)
// app.get('/jsonRoute', (req, res) => {
//     console.log("test");
//     var data = fs.readFileSync('./postcardData.json');
//     res.writeHead(200, {"Content-Type": "application/json"});
//     res.write(data);
//     res.end();
// });


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// SEND TO DATABASE
app.post('/dbRoute', (req, res, next) => {
    console.log("DB Sending Begun!", req.body);
    let photo = req.body.photo;
    let color = req.body.color;
    let font = req.body.font;
    let message = req.body.message;
    let queryStr = makeid(22); //randomly generated url string

    console.log("generatedStrUrl", queryStr, "img", photo, "color", color, "font", font,"message", message);

    // STORE INSIDE DATABASE
    let cmd = "INSERT INTO postcardTable (photo, message, font, color, queryStr) VALUES (?,?,?,?,?) ";
    myDB.run(cmd, photo, message, font, color, queryStr, (err) => {
        if (err) {
            console.log("DB insertion error!", err.message)
            next();
        } else {
            let newID = this.lastID; //last row of inserted item
            res.send("queried string" + queryStr);
        }
    });
});

app.get('/display.html', (req, res, next) => {

    let r = "'"+req.query.id+"'";
    console.log("server side r =>", r); // 'GV7RdXDp4LhLLWPw0HIZTnf'


    let cmd = "SELECT * FROM postcardTable WHERE queryStr= " + r ;
    // console.log(cmd);
    myDB.all(cmd, (err, rows) => {
        if (err) {
            console.log("Database reading error!", err.message);
            next();
        } else {
            res.json(rows);
            console.log("rows",rows);

        }
    });
});










const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


