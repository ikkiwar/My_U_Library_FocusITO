var Express = require('express');
var BodyParser = require('body-parser');

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
var CONNECTION_STRING = "mongodb://3.142.191.243:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
var DATABASE_NAME = "MyULibrary";
var database;



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
            res.send(docs);
        }
    });
});
