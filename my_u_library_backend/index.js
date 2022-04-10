var Express = require('express');
var BodyParser = require('body-parser');
require('dotenv').config();

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
var CONNECTION_STRING = process.env.BASE_CONNECTION_CHAIN;
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

    database.collection('books').find({ ...req.query}).toArray(function (err, docs) {
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
    var query = {};
    req.query.email ? query.email = req.query.email : null;
    database.collection('user').find({...query}).toArray(function (err, docs) {
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

// borrowed books

app.get('/api/borrowedbooks', (req, res) => {
    var queryBody = {};
    req.query.idUser ? queryBody.idUser = parseInt(req.query.idUser) : null;
    req.query.idBook ? queryBody.idBook = parseInt(req.query.idBook) : null;
    req.query.idBookStatus ? queryBody.idBookStatus = parseInt( req.query.idBookStatus): null;

    database.collection('borrowedbooks').aggregate([

        {$match: queryBody},
        {
        $lookup:{
            from: 'user',
            localField: 'idUser',
            foreignField: 'idUser',
            as: 'user'
        }
    },{
        $lookup:{
            from: 'books',
            localField: 'idBook',
            foreignField: 'idBook',
            as: 'book'
        }
    },{
        $lookup:{
            from: 'bookstatus',
            localField: 'idBookStatus',
            foreignField: 'idBookStatus',
            as: 'status'
        }
    },  {$unset: ["user.password"]},]).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {

            res.json(docs);
        }
    });
});

app.post('/api/borrowedbooks', (req, res) => {
    database.collection("borrowedbooks").count({}, function (err, count) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            var borrowed = req.body;
            borrowed.idBorrowed = count + 1;

            database.collection("borrowedbooks").insertOne(borrowed, function (err, result) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.json(borrowed);
                }
            });
        }
    });
});

app.put('/api/borrowedbooks/:id', (req, res) => {

    database.collection("borrowedbooks").updateOne(
        {
            "idBorrowed": parseInt(req.params.id)
        },
        {
            $set: {
                "idBook": req.body.idBook,
                "idUser": req.body.idUser,
                "idBookStatus": req.body.idBookStatus
            }
        }

    );
    res.json("Book updated");

});
