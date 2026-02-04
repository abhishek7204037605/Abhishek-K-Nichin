import fs from 'fs';
const asyncfile='example_async.txt';
const content='Hello, World!whatever';
fs.writeFileSync('example.txt', content);
console.log('File written successfully.');
fs.writeFile(asyncfile, content, (err) => {
  console.log('Asynchronous file written successfully.');
});
fs.appendFile(asyncfile, 'Appended content.', (err) => {
  console.log('Content appended successfully.');
});
fs.readFile(asyncfile, 'utf8', (err, data) => {
  console.log('File content:', data);
});
fs.appendFile(asyncfile, '\nAbhi.', (err) => {
  console.log('Content appended successfully.');
});
fs.readFile(asyncfile, 'utf8', (err, data) => {
  console.log('File content:', data);
});
