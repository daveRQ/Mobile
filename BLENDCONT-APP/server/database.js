const mongoose = require('mongoose');
const {mogoUrl} = require('./keys')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const URI = 'mongodb://localhost/restaurante';
/*
const con = mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
*/

mongoose.connect(mogoUrl,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
.catch(err => console.log(err));

module.exports = mongoose;