const fs = require('fs');

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }

    fs.mkdirSync('./files', { recursive: true }, (err) => {
      if (err) {
        console.log('Error creating directory:', err);
        return;
      }
    });

    fs.writeFileSync('./files/test_2.txt', `${data} and Additional text`, (err) => {
        if (err) {
          console.log('Error writing file:', err);
          return;
        }
      });
    console.log('File read:', data);
});

setTimeout(() => {
  if(fs.existsSync('./files/test_2.txt')) {
    fs.unlinkSync('./files/test_2.txt', (err) => {});
  }
}, 4000);

setTimeout(() => {
  if(fs.existsSync('./files')) {
    fs.rmdirSync('./files', { recursive: true }, (err) => {});
  };
}, 7000);

console.log('Just test');


