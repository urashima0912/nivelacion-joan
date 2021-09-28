const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sessions')
.then(() => {
    console.log('DB connected');
})
.catch((err) => {
    console.log(err);
})