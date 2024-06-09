const mongoose = require('mongoose');

const initConnection = () => {
    return mongoose.connect(process.env.CONNECTION_STRING_ONLINE)
        .then(() => console.log('connected'))
        .catch(() => console.log('error connecting to DB'));
}

module.exports = initConnection;
