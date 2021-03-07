// importing express to use for server
const express = require('express');
// importing mongoose to  setup no sql db
const mongoose = require('mongoose');

// setting up express instance
const app = express();
// setting up ports to use for server connection, ether process.env.PORT or default to 3001
const PORT = process.env.PORT || 3001

//middleware to handle files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

//implementing mongoose to project
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));