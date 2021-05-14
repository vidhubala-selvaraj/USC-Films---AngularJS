var express = require('express');
const cors = require('cors')
var posts = require('./routes/posts')
var watch = require('./routes/watch')
var modal = require('./routes/modal')
var search = require('./routes/search')



var app = express();
app.use(cors());

app.get('/', function(req, res) {
    res.send('Hello World');
})


app.use('/posts', posts);
app.use('/watch', watch);
app.use('/modal', modal);
app.use('/search', search);

// app.listen(8080, '100.65.12.246', function() {
//     console.log("Listening..")
// })

// app.listen(8080, '192.168.1.18', function() {
//     console.log("Listening..")
// })

app.listen(5000, 'localhost', function() {
    console.log("Listening..")
})

module.exports = app;