const random = require('random-name');
const http = require('http');
const url = require('url');

const lyricsGenerator = require('./lyrics_generator');
const port = process.env.SPECIAL_PORT || 8000;

const requestHandler = (request, response) => {  
  const url_parts = url.parse(request.url, true);
  const query = url_parts.query;

  const firstname = query.name || random.first();
  const message = lyricsGenerator(firstname)
  response.end(message);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('ERROR:', err)
  }

  console.log(`****\n\nSERVER AVAILABLE ON ${port}\n\n****`);
});

