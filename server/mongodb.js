/**
 * Created by reddy on 2017/7/5.
 */
const exec = require('child_process').exec;

exec(`mongod --dbpath ./db --port 27777`, (mongodErr, stdout, stderr) => {
  if (mongodErr) {
    console.error(mongodErr);
  }
});