// const connectionString = 'mongodb://localhost:27017/MusicRocksMyWorld-Db';
const connectionString = 'mongodb://the-wise:akSJH9340I9S*(@ds133044.mlab.com:33044/news-app-db';
// const connectionString = 'mongodb://db:27017/MusicRocksMyWorld-Db';
// const connectionString = 'mongodb://ec2-35-158-146-44.eu-central-1.compute.amazonaws.com:27017//MusicRocksMyWorld-Db';

const { MongoClient, ObjectID } = require('mongodb');

const init = () => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log('Databases connected');
            return db;
        });
};

module.exports = { init, ObjectID };
