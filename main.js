/* globals __dirname */
// const express = require('express');

// app.use('/static', express.static(__dirname + '/public'));

// const start = () => {
//     return Promise.resolve();
// };

// start()
//     .then(() => require('./data/database-connection').init())
//     .then((db) => require('./data/data').init(db))
//     .then((data) => require('./config/app')(data))
//     .then((app) => {
//       app.listen(3006, () => {
//         console.log(`Server is running on port ${3006}.`);
//       });
//     });

const start = () => {
    return Promise.resolve();
};

start()
    .then(() => require('./data/database-connection').init())
    .then((db) => require('./data/data').init(db))
    .then((data) => require('./config/app')(data))
    .then((app) => {
      app.set('port', (process.env.PORT || 3006));
      app.listen(app.get('port'), () => {
        console.log(`Server is running on port ${app.get('port')}.`);
      });
    });
