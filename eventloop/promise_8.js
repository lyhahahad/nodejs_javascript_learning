// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setImmediate(() => {
    console.log('immediate');
  });  
  setTimeout(() => {
    console.log('timeout');
  }, 0);
});