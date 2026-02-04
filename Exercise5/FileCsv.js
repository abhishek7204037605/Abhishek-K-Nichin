import fs from 'fs';
const asyncfile = 'example_async.csv';
const header = 'Name,Age,Location\n';
const rows = [  'John,30,New York',
  'Jane,25,Los Angeles',
  'Mike,35,Chicago'];
fs.writeFileSync('example.csv', header + rows.join('\n'));
console.log('CSV file written successfully.');
fs.writeFile(asyncfile, header + rows.join('\n'), (err) => {
  console.log('Asynchronous CSV file written successfully.');
}); 
fs.appendFile(asyncfile, 'Alice,28,Miami\n', (err) => {
  console.log('Row appended successfully.');
});
fs.readFile(asyncfile, 'utf8', (err, data) => {
  console.log('CSV file content:\n', data);
});