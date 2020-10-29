const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    //use fs to read the db.json file
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err
        //parse the file json.parse
        let notes = JSON.parse(data)
        //return to res.json the object of notes
        return res.json(notes);

    })
});

app.post("/api/notes", function (req, res) {
    let notes;
    //use fs to retrieve the db.json file
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err
        //parse the file json.parse
        notes = JSON.parse(data)

        // extract the new notes from req.body
        newNote = req.body
        // push new note to the retrieved object
        notes.push(newNote)
        // write back the updated object to the db.json file
        fs.writeFile("db/db.json",JSON.stringify(notes),function(){
            console.log("wrote to file")
        })
        //return to res.json the object of notes
        return res.json(newNote);
    });
});

// 
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

