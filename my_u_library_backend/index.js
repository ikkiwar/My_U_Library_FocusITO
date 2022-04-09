var Express = require('express');
var BodyParser = require('body-parser');

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
var CONNECTION_STRING = "mongodb://3.142.191.243:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
var DATABASE_NAME = "MyULibrary";
var database;

var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/Photos', Express.static(__dirname + '/Photos'));

var cors = require('cors');
app.use(cors());



app.listen(49146, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function (err, client) {
        database = client.db(DATABASE_NAME);
        console.log("Connected to " + DATABASE_NAME + "!");
    });
    console.log('Server is running on port 49146');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/role', (req, res) => {
    database.collection('role').find({}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(docs);
        }
    });
});

// Books

app.get('/api/books', (req, res) => {
    database.collection('books').find({}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(docs);
        }
    });
});

app.post('/api/books', (req, res) => {
   database.collection("books").count({}, function (err, count) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var book = req.body;
            book.idBook = count + 1;

            database.collection("books").insertOne(book, function (err, result) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.json(book);
                }
            });
        }
    });
});

app.put('/api/books/:id', (req, res) => {

            database.collection("books").updateOne(
                {
                    "idBook": parseInt(req.params.id)
                },
                {
                    $set: {
                        "title": req.body.title,
                        "author": req.body.author,
                        "published_year": req.body["published_year"],
                        "genre": req.body.genre,
                        "image": req.body.image,
                        "copies": req.body.copies
                    }
                }

            );
            res.json("Book updated");

});

app.delete('/api/books/:id', (req, res) => {
    database.collection("books").deleteOne(
        {
            "idBook": parseInt(req.params.id)
        }
    );
    res.json("Book deleted");
});

app.post('/api/books/savefile', (req,res) => {
    fs.writeFile("./Photos/"+req.files.file.name,
        req.files.file.data,
        function (err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json("File uploaded");
            }
        }
        )
})

// Users

app.get('/api/user', (req, res) => {
    database.collection('user').find({}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(docs);
        }
    });
});

app.post('/api/user', (req, res) => {
    database.collection("user").count({}, function (err, count) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var user = req.body;
            user.idUser = count + 1;

            database.collection("user").insertOne(user, function (err, result) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.json(user);
                }
            });
        }
    });
});

app.put('/api/user/:id', (req, res) => {

    database.collection("user").updateOne(
        {
            "idUser": parseInt(req.params.id)
        },
        {
            $set: {
                "name": req.body.name,
                "last_name": req.body["last_name"],
                "email": req.body.email,
                "password": req.body.password,
                "idRole": req.body.idRole
            }
        }

    );
    res.json("User updated");

});

app.delete('/api/user/:id', (req, res) => {
    database.collection("user").deleteOne(
        {
            "idUser": parseInt(req.params.id)
        }
    );
    res.json("User deleted");
});


