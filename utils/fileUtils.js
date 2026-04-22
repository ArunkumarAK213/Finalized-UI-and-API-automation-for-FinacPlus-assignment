const fs = require('fs');

function saveBook(data) {
  fs.writeFileSync(
    'book.txt',
    `Title: ${data.title}\nAuthor: ${data.author}\nPublisher: ${data.publisher}`
  );
}

module.exports = { saveBook };