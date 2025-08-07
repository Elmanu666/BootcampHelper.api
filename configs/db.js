const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const connectDB = async (mongoUrl) => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', true);

  if (mongoUrl) {
    return mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  console.log(process.env.MONGOODBURL, process.env.DBUSER, process.env.DBPSW);

  if (process.env.DBPSW && process.env.MONGOODBURL) {
    const dbUrl = process.env.MONGOODBURL;
    const mongoodbUrl = 'mongodb://' + dbUrl;
    return mongoose.connect(mongoodbUrl, {
      reconnectTries: 30,
      reconnectInterval: 1000,
      auth: {
        user: process.env.DBUSER,
        password: process.env.DBPSW,
        dbName: 'bootcamphelper',
        authSource: 'admin',
      },
      useNewUrlParser: false,
    })
      .then(() => {
        console.log('Succesfully Connected to the Mongodb Database  at URL : ' + mongoodbUrl);
      })
      .catch((err) => {
        console.log('not able to connect');
        console.log(mongoodbUrl, err);
      });
  } else {
    const dbUrl = process.env.MONGOODBURL || 'localhost:27017';
    const mongoodbUrl = 'mongodb://' + dbUrl + '/bootcampHelper';
    return mongoose.connect(mongoodbUrl, {
      reconnectTries: 30,
      reconnectInterval: 1000,
      useNewUrlParser: true,
    })
      .then(() => {
        console.log('Succesfully Connected to the Mongodb Database  at URL : ' + mongoodbUrl);
      })
      .catch((err) => {
        console.log(mongoodbUrl, err);
      });
  }
};

const closeDB = () => mongoose.connection.close();

module.exports = { connectDB, closeDB };
